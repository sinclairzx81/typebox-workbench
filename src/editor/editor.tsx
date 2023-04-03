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

import { Formatter } from '../codegen/common/index'
import { Monaco } from '../monaco/index.mjs'
import { Storage, TransformType } from '../storage/index.mjs'
import { Debounce } from '../async/index.mjs'
import { Share } from '../share/index.mjs'
import * as Codegen from '../codegen/index'
import * as Layouts from '../layout/index.js'
import * as monaco from 'monaco-editor'
import * as React from 'react'

export interface EditorProperties {
  code?: string
}
export function Editor(props: EditorProperties) {
  const [state, setState] = React.useState(Storage.getTransformTargetType())
  const { current: debounce } = React.useRef(new Debounce(500, true))
  const sourceEditor = React.useRef<null | monaco.editor.IStandaloneCodeEditor>(null)
  const targetEditor = React.useRef<null | monaco.editor.IStandaloneCodeEditor>(null)
  const sourceEditorRef = React.useRef(null)
  const targetEditorRef = React.useRef(null)
  React.useEffect(() => {
    setupEditors()
    return () => disposeEditors()
  }, [])
  function setupEditors() {
    setupSourceEditor()
    setupTargetEditor()
    updateTransform()
  }
  function disposeEditors() {
    disposeSourceEditor()
    disposeTargetEditor()
  }
  function setupSourceEditor() {
    if (sourceEditorRef.current === null) return
    const code = props.code || Storage.getTransformSourceCode()
    const editor = Monaco.create(sourceEditorRef.current, code, (content) => {
      Share.set(content)
      Storage.setTransformSourceCode(content)
      updateTransform()
    })
    editor.onKeyUp(() => debounce.run(() => updateTransform()))
    sourceEditor.current = editor
  }
  function setupTargetEditor() {
    if (targetEditorRef.current === null) return
    const editor = Monaco.create(targetEditorRef.current, '')
    targetEditor.current = editor
  }
  function disposeSourceEditor() {
    if (sourceEditor.current === null) return
    sourceEditor.current.dispose()
  }
  function disposeTargetEditor() {
    if (targetEditor.current === null) return
    targetEditor.current.dispose()
  }
  function useCyclicModel(type: TransformType) {
    return type === 'arktype' //|| type === 'jsonschema' || type === 'expression'
  }
  function buildTransform(type: TransformType, typescript: string): string {
    const model = Codegen.TypeScriptToModel.Generate(typescript)
    if (type === 'arktype') return Codegen.ModelToArkType.Generate(model)
    if (type === 'expression') return Codegen.ModelToExpr.Generate(model)
    if (type === 'grpc') return Codegen.ModelToGRPC.Generate(model)
    if (type === 'iots') return Codegen.ModelToIoTs.Generate(model)
    if (type === 'javascript') return Codegen.ModelToJavaScript.Generate(model)
    if (type === 'jsonschema') return Codegen.ModelToJsonSchema.Generate(model)
    if (type === 'typebox') return Codegen.TypeScriptToTypeBox.Generate(typescript)
    if (type === 'typescript') return Codegen.ModelToTypeScript.Generate(model)
    if (type === 'valibot') return Codegen.ModelToValibot.Generate(model)
    if (type === 'value') return Codegen.ModelToValue.Generate(model)
    if (type === 'yup') return Codegen.ModelToYup.Generate(model)
    if (type === 'zod') return Codegen.ModelToZod.Generate(model)
    return ''
  }
  function resolveTransform(type: TransformType, typescript: string): string {
    try {
      if (type !== 'yup') {
        return Formatter.Format(buildTransform(type, typescript))
      } else {
        return buildTransform(type, typescript)
      }
    } catch (error) {
      console.log(error)
      // todo: better error reporting
      const current = targetEditor.current!.getValue()
      const updated = current.indexOf(`// [${type}: transform-error]`) === 0 ? current.split('\n').slice(1).join('\n') : current
      const message = `// [${type}: transform-error]`
      return [message, updated].join('\n')
    }
  }
  function updateTransform() {
    try {
      if (sourceEditor.current === null || targetEditor.current === null) return
      Storage.setTransformSourceCode(sourceEditor.current.getValue())
      const target = Storage.getTransformTargetType()
      const source = Storage.getTransformSourceCode()
      const transform = resolveTransform(target, source)
      targetEditor.current.setValue(transform)
    } catch (error) {
      console.log(error)
    }
  }
  function getControlsButtonClassName(type: TransformType) {
    return type === state ? `${type} control selected` : `${type} control`
  }
  function getTransformLabel(type: TransformType) {
    if (type === 'arktype') return 'ArkType'
    if (type === 'expression') return 'Type Expression'
    if (type === 'iots') return 'io-ts'
    if (type === 'grpc') return 'GRPC Interface Definition Language'
    if (type === 'javascript') return 'JavaScript'
    if (type === 'jsonschema') return 'Json Schema'
    if (type === 'value') return 'JavaScript Value'
    if (type === 'typebox') return 'TypeBox'
    if (type === 'typescript') return 'TypeScript'
    if (type === 'valibot') return 'Valibot'
    if (type === 'yup') return 'Yup'
    if (type === 'zod') return 'Zod'
  }
  const arktypeControlClassName = getControlsButtonClassName('arktype')
  const expressionControlClassName = getControlsButtonClassName('expression')
  const iotsControlClassName = getControlsButtonClassName('iots')
  const grpcControlClassName = getControlsButtonClassName('grpc')
  const jsonschemaControlClassName = getControlsButtonClassName('jsonschema')
  const javascriptControlClassName = getControlsButtonClassName('javascript')
  const typeboxControlClassName = getControlsButtonClassName('typebox')
  const typescriptControlClassName = getControlsButtonClassName('typescript')
  const valibotControlClassName = getControlsButtonClassName('valibot')
  const valueControlClassName = getControlsButtonClassName('value')
  const yupControlClassName = getControlsButtonClassName('yup')
  const zodControlClassName = getControlsButtonClassName('zod')
  function onTransform(type: TransformType) {
    targetEditor.current!.setValue('')
    Storage.setTransformTargetType(type)
    updateTransform()
    setState(type)
  }
  return (
    <div className="editor">
      <Layouts.Splitter id="editor-seperator">
        <div className="source-container">
          <div ref={sourceEditorRef} className="source-editor"></div>
        </div>
        <div className="target-container">
          <div className="target-controls">
            <div className={typeboxControlClassName} title="TypeBox Transform" onClick={() => onTransform('typebox')}></div>
            <div className="control separator" />
            <div className={zodControlClassName} title="Zod Transform" onClick={() => onTransform('zod')}></div>
            <div className={iotsControlClassName} title="Io-Ts Transform" onClick={() => onTransform('iots')}></div>
            <div className={arktypeControlClassName} title="ArkType Transform" onClick={() => onTransform('arktype')}></div>
            <div className={yupControlClassName} title="Yup Transform" onClick={() => onTransform('yup')}></div>
            <div className={valibotControlClassName} title="Valibot Transform" onClick={() => onTransform('valibot')}></div>
            <div className="control separator" />
            <div className={jsonschemaControlClassName} title="JSON Schema Transform" onClick={() => onTransform('jsonschema')}></div>
            <div className={expressionControlClassName} title="Expr Transform" onClick={() => onTransform('expression')}></div>
            {/* <div className={grpcControlClassName} title="GRPC IDL Transform" onClick={() => onTransform('grpc')}></div> */}
            <div className="control separator" />
            <div className={typescriptControlClassName} title="TypeScript Transform" onClick={() => onTransform('typescript')}></div>
            <div className={javascriptControlClassName} title="JavaScript Transform" onClick={() => onTransform('javascript')}></div>
            <div className="control separator" />
            <div className={valueControlClassName} title="Value Transform" onClick={() => onTransform('value')}></div>
          </div>
          <div className="target-name">{getTransformLabel(state)}</div>
          <div ref={targetEditorRef} className="target-editor"></div>
        </div>
      </Layouts.Splitter>
    </div>
  )
}
