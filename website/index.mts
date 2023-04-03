import './index.css'

import { TypeScriptToTypeBox } from './codegen/index.mjs'
import { Storage } from './storage/index.mjs'
import { Debounce } from './async/index.mjs'
import { Monaco } from './monaco/index.mjs'

const typescript = Monaco.create(document.getElementById('typescript')!, Storage.get())
const typebox = Monaco.create(document.getElementById('typebox')!, '')
const debounce = new Debounce(750, true)

async function transform() {
  Storage.set(typescript.getValue())
  typebox.setValue(TypeScriptToTypeBox.Generate(Storage.get()))
  await typebox.getAction('editor.action.formatDocument')!.run()
}

typescript.onKeyUp(() => debounce.run(() => transform()))
transform()

// Load the declaration file for the lodash library
