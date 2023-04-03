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

import './index.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Share } from './share/index.mjs'
import { Editor } from './editor/index'

const code = Share.get()

export function AppHeader() {
  return (
    <div className="header">
      <div className="left">
        <a href="https://github.com/sinclairzx81/typebox" target="_blank">
          <div className="logo"></div>
        </a>
      </div>
      <div className="middle">
        <h2>TypeBox-Workbench</h2>
        <p>Type Transform Tool for Runtime Type Systems</p>
      </div>
      <div className="right">
        <a href="https://github.com/sinclairzx81/typebox-workbench" target="_blank">
          <img src="assets/images/github.png" />
        </a>
      </div>
    </div>
  )
}
function AppBody() {
  return (
    <div className="body">
      <Editor code={code} />
    </div>
  )
}
function AppFooter() {
  return (
    <div className="footer">
      <span>
        Made with{' '}
        <a href="https://github.com/sinclairzx81/typebox" target="_blank">
          TypeBox
        </a>{' '}
        &{' '}
        <a href="https://github.com/sinclairzx81/typebox-codegen" target="_blank">
          TypeBox-Codegen
        </a>
      </span>
    </div>
  )
}
export function App() {
  return (
    <div className="app">
      <AppHeader />
      <AppBody />
      <AppFooter />
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('container')!)
root.render(<App />)
