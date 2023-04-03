/*--------------------------------------------------------------------------

@sinclair/typebox/workbench

The MIT License (MIT)

Copyright (c) 2017-2023 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

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

// -------------------------------------------------------------
// Monaco Workers
// -------------------------------------------------------------
self['MonacoEnvironment'] = {
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
// -------------------------------------------------------------
// Monaco Themes
// -------------------------------------------------------------
monaco.editor.defineTheme('typebox', {
  base: 'vs-dark',
  colors: {
    'editor.background': '#292d3e',
    'editor.foreground': '#AAAAAA',
    'editor.selectionBackground': '#333333',
  },
  inherit: true,
  rules: [
    {
      token: 'keyword',
      foreground: '#FFA500',
      background: '#000000',
    },
  ],
})
// -------------------------------------------------------------
// Language Configuration
// -------------------------------------------------------------
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  target: monaco.languages.typescript.ScriptTarget.ESNext,
  allowNonTsExtensions: true,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  module: monaco.languages.typescript.ModuleKind.CommonJS,
  noEmit: true,
  baseUrl: '.',
  paths: {
    '@sinclair/typebox': ['typebox.ts'],
  },
})
// -------------------------------------------------------------
// TypeBox Model
// -------------------------------------------------------------
const typeboxCode = await fetch('./typebox/typebox.d.ts').then((res) => res.text())
monaco.languages.typescript.typescriptDefaults.addExtraLib(typeboxCode, 'typebox.ts')
monaco.editor.createModel(typeboxCode, 'typescript', monaco.Uri.parse('@sinclair/typebox'))
// -------------------------------------------------------------
// Monaco Factory
// -------------------------------------------------------------
export namespace Monaco {
  export function create(element: HTMLElement, value: string) {
    return monaco.editor.create(element, {
      language: 'typescript',
      automaticLayout: true,
      theme: 'typebox',
      value,
    })
  }
}
