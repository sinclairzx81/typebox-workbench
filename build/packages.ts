import * as Fs from 'node:fs/promises'
import * as Path from 'node:path'
import { existsSync } from 'node:fs'

async function collect<T>(iterator: AsyncIterableIterator<T>): Promise<T[]> {
  const buffer:T[] = []
  for await(const value of iterator) {
    buffer.push(value)
  }
  return buffer
}

// ---------------------------------------------------------------
// Yields a flat list of file tree entries
// ---------------------------------------------------------------
export type Entry = { type: 'file' | 'directory', path: string }

// prettier-ignore
async function* fileTree(directory: string): AsyncIterableIterator<Entry> {
  for (const name of await Fs.readdir(directory)) {
    const path = Path.join(directory, name)
    const stat = await Fs.stat(path)
    if (stat.isDirectory()) {
      yield { type: 'directory', path: path }
      yield* fileTree(path)
    } else if (stat.isFile()) {
      yield { type: 'file', path: path }
    }
  }
}
// ---------------------------------------------------------------
// Writes Transform Packages into Docs
// ---------------------------------------------------------------
async function addPackage(sourceDirectory: string, targetDirectory: string) {
  for await (const entry of fileTree(sourceDirectory)) {
    if (entry.type === 'directory') continue
    const path = Path.join(targetDirectory, entry.path)
    const parent = Path.dirname(path)
    if (!existsSync(parent))  await Fs.mkdir(parent, { recursive: true })
    await Fs.copyFile(entry.path, path)
  }
}
export async function copyPackages(packageNames: string[], targetDirectory: string) {
  for (const packageName of packageNames) {
    addPackage(`node_modules/${packageName}`, targetDirectory)
  }
}
// ---------------------------------------------------------------
// Writes Monaco Package Manifest File
// ---------------------------------------------------------------
async function * getEntriesForPackages(packageNames: string[]): AsyncIterableIterator<Entry> {
  for (const packageName of packageNames) {
    for await (const entry of fileTree(`node_modules/${packageName}`)) {
      yield { ...entry, path: entry.path.replaceAll('\\', '/') }
    }
  }
}
export async function writeManifest(packageNames: string[], targetDirectory: string) {
  const entries = await collect(getEntriesForPackages(packageNames))
  const content = JSON.stringify(entries, null, 2)
  const path = Path.join(targetDirectory, '/node_modules/manifest.json')
  const parent = Path.dirname(path)
  if(!existsSync(parent)) await Fs.mkdir(parent)
  await Fs.writeFile(path, content)
}
// required for node_modules publishing on gh-pages
export async function addNoJekyll(targetDirectory: string) {
  const path = Path.join(targetDirectory, '.nojekyll')
  await Fs.writeFile(path, Buffer.alloc(0))
}
export async function addPackages(packageNames: string[], targetDirectory: string = 'docs') {
  await copyPackages(packageNames, targetDirectory)
  await writeManifest(packageNames, targetDirectory)
  await addNoJekyll(targetDirectory)
}