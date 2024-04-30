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

import * as monaco from 'monaco-editor'
import * as Async from '../async/index.mjs'
import * as Cache from '../cache/index.mjs'

// --------------------------------------------------------------------------
// Module Cache
// --------------------------------------------------------------------------
const moduleCache = await Cache.open('node_modules', 1)

// --------------------------------------------------------------------------
// Monaco Workers
// --------------------------------------------------------------------------
self['MonacoEnvironment'] = {
  createTrustedTypesPolicy: function (name, options) {
    return {} as any // what's this for?
  },
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './monaco-workers/json.worker.js'
    } else if (label === 'css' || label === 'scss' || label === 'less') {
      return './monaco-workers/css.worker.js'
    } else if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './monaco-workers/html.worker.js'
    } else if (label === 'typescript' || label === 'javascript') {
      return './monaco-workers/ts.worker.js'
    } else {
      return './monaco-workers/editor.worker.js'
    }
  },
}
// --------------------------------------------------------------------------
// File IO
// --------------------------------------------------------------------------
const fetchFile = async (path: string) => await fetch(path).then((res) => res.text())
const readJson = async (path: string) => await fetch(path).then((res) => res.json())
// --------------------------------------------------------------------------
// File Manifest
// --------------------------------------------------------------------------
export type Entry = { type: 'file' | 'directory'; path: string }
export type MonacoEntry = { path: string; alias: string }
function hasExtension(filePath: string, extension: string): boolean {
  return filePath.lastIndexOf(extension) === filePath.length - extension.length
}
function isDeclaration(entry: Entry) {
  return entry.type !== 'directory' && (hasExtension(entry.path, '.ts') || hasExtension(entry.path, '.json'))
}
function mapEntry(entry: Entry): MonacoEntry {
  const path = `./${entry.path}`
  const alias = entry.path.replace('node_modules/', '')
  return { path, alias }
}
async function getMonacoEntries(): Promise<MonacoEntry[]> {
  const entries: Entry[] = await readJson('./node_modules/manifest.json')
  const declarations = entries.filter((entry) => isDeclaration(entry))
  return declarations.map((entry) => mapEntry(entry))
}
export async function loadEntry(entry: MonacoEntry): Promise<string> {
  const value = await moduleCache.get(entry.path)
  if (typeof value === 'string') return value
  const content = await fetchFile(entry.path)
  await moduleCache.set(entry.path, content)
  return content
}
async function addExtraLib(entry: MonacoEntry, semaphore: Async.Semaphore, loading: HTMLDivElement): Promise<monaco.IDisposable> {
  const lock = await semaphore.lock()
  loading.innerHTML = `<span style='color: white'>LOADING</span>&nbsp;${entry.path}`
  const content = await loadEntry(entry)
  const result = monaco.languages.typescript.typescriptDefaults.addExtraLib(content, entry.alias)
  lock.dispose()
  return result
}
export async function loadDependencies() {
  const container = document.getElementById('container')!
  const loading = document.createElement('div')
  loading.id = 'loading'
  container.appendChild(loading)

  const semaphore = new Async.Semaphore({ concurrency: 128 })
  const entries = await getMonacoEntries()
  for (const entry of entries) addExtraLib(entry, semaphore, loading)
  const lock = await semaphore.lock()
  lock.dispose()
  container.removeChild(loading)
}
// -------------------------------------------------------------
// Monaco Global Setup
// -------------------------------------------------------------
monaco.editor.defineTheme('typebox', {
  base: 'vs-dark',
  colors: {
    'editor.background': '#0d1117',
    //'editor.background': '#060A0F',
    'editor.foreground': '#AAAAAA',
  },
  inherit: true,
  rules: [
    {
      token: 'keyword',
      foreground: '#FFA500',
    },
  ],
})
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  strict: true,
  target: monaco.languages.typescript.ScriptTarget.ESNext,
  allowNonTsExtensions: true,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  module: monaco.languages.typescript.ModuleKind.CommonJS,
  allowSyntheticDefaultImports: true,
  noEmit: true,
  baseUrl: '.',
  typeRoots: ['node_modules/@types'],
})

await loadDependencies().catch((error) => console.log(error))

// -------------------------------------------------------------
// Monaco Factory
// -------------------------------------------------------------
export namespace Monaco {
  export function create(element: HTMLElement, value: string, onSave: (content: string) => any = () => {}) {
    const editor = monaco.editor.create(element, {
      minimap: { enabled: false },
      language: 'typescript',
      automaticLayout: true,
      theme: 'typebox',
      tabSize: 2,
      value,
    })
    // prevent ctrl+s chords on the editor
    element.addEventListener('keydown', (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        onSave(editor.getValue())
      }
    })
    return editor
  }
}
