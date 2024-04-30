/*--------------------------------------------------------------------------

@sinclair/typebox/workbench

The MIT License (MIT)

Copyright (c) 2023 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

import * as IndexedDB from '../indexeddb/index.mjs'
import * as Async from '../async/index.mjs'

export interface Item {
  key: string
  value: string
}
export class Cache {
  readonly #database: IndexedDB.Database
  readonly #semaphore: Async.Semaphore
  constructor(database: IndexedDB.Database) {
    this.#semaphore = new Async.Semaphore({ concurrency: 1 })
    this.#database = database
  }
  public async get(key: string): Promise<string | null> {
    const transaction = this.#database.transaction(['items'], 'readonly')
    const items = transaction.objectStore<Item>('items')
    const item = await items.get(key)
    return item === undefined ? null : item.value
  }
  public async set(key: string, value: string): Promise<void> {
    const lock = await this.#semaphore.lock()
    try {
      const transaction = this.#database.transaction(['items'], 'readwrite')
      const items = transaction.objectStore<Item>('items')
      await items.add({ key, value })
      transaction.commit()
    } catch (error: any) {
      console.log(key, error.message)
    } finally {
      lock.dispose()
    }
  }
}
// prettier-ignore
export async function open(name: string, version: number, attempt: number = 0) {
  try {
    const database = await IndexedDB.Factory.open(name, async (database) => {
      if (database.objectStoreNames.contains('items')) {
        database.deleteObjectStore('items')
      } 
      database.createObjectStore('items', { keyPath: 'key' })
    }, version)
    return new Cache(database)
  } catch (error) {
    if(attempt === 0) {
      await IndexedDB.Factory.deleteDatabase(name)
      return await open(name, version, 1)
    } else {
      throw new Error('Cache database failed to open')
    }
  }
}
