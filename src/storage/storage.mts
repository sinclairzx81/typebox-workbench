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

export type TransformType = 'arktype' | 'effect' | 'expression' | 'grpc' | 'iots' | 'javascript' | 'jsonschema' | 'typebox' | 'typescript' | 'valibot' | 'value' | 'yrel' | 'yup' | 'zod'

export namespace Storage {
  // prettier-ignore
  const defaultCode = [
    `// Edit TypeScript Types Here. Use Ctrl + S to Share`, 
    '', 
    `export type T = {`, 
    `  /**`,
    `   * @minimum 0`,
    `   * @maximum 1`,
    `   * @default 0`,
    `   */`,
    `  x: number`,
    `  /**`,
    `   * @minimum 0`,
    `   * @maximum 1`,
    `   * @default 1`,
    `   */`,
    `  y: number`,
    `}`].join('\n')
  function ensure(key: string, value: string) {
    const item = globalThis.localStorage.getItem(key)
    if (typeof item === 'string') return
    globalThis.localStorage.setItem(key, value)
  }
  // --------------------------------------------------------------------------
  // TransformSourceCode: Used to persist source for refresh
  // --------------------------------------------------------------------------
  export function getTransformSourceCode(): string {
    ensure('typebox-workbench:transform-source-code', defaultCode)
    return globalThis.localStorage.getItem('typebox-workbench:transform-source-code')!
  }
  export function setTransformSourceCode(value: string): void {
    globalThis.localStorage.setItem('typebox-workbench:transform-source-code', value)
  }
  // --------------------------------------------------------------------------
  // TransformTargetType: Used to persist the target type between refreshes
  // --------------------------------------------------------------------------
  export function getTransformTargetType(): TransformType {
    ensure('typebox-workbench:transform-target-type', 'typebox')
    return globalThis.localStorage.getItem('typebox-workbench:transform-target-type')! as TransformType
  }
  export function setTransformTargetType(value: TransformType): void {
    globalThis.localStorage.setItem('typebox-workbench:transform-target-type', value)
  }
}
