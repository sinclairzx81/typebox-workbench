import{bl as o}from"./chunk-V3PZ4URB.js";var d=Object.defineProperty,O=Object.getOwnPropertyDescriptor,m=Object.getOwnPropertyNames,y=Object.prototype.hasOwnProperty,h=(e,i,t,s)=>{if(i&&typeof i=="object"||typeof i=="function")for(let r of m(i))!y.call(e,r)&&r!==t&&d(e,r,{get:()=>i[r],enumerable:!(s=O(i,r))||s.enumerable});return e},E=(e,i,t)=>(h(e,i,"default"),t&&h(t,i,"default")),L="5.4.5",n={};E(n,o);var u=(e=>(e[e.None=0]="None",e[e.CommonJS=1]="CommonJS",e[e.AMD=2]="AMD",e[e.UMD=3]="UMD",e[e.System=4]="System",e[e.ES2015=5]="ES2015",e[e.ESNext=99]="ESNext",e))(u||{}),l=(e=>(e[e.None=0]="None",e[e.Preserve=1]="Preserve",e[e.React=2]="React",e[e.ReactNative=3]="ReactNative",e[e.ReactJSX=4]="ReactJSX",e[e.ReactJSXDev=5]="ReactJSXDev",e))(l||{}),_=(e=>(e[e.CarriageReturnLineFeed=0]="CarriageReturnLineFeed",e[e.LineFeed=1]="LineFeed",e))(_||{}),c=(e=>(e[e.ES3=0]="ES3",e[e.ES5=1]="ES5",e[e.ES2015=2]="ES2015",e[e.ES2016=3]="ES2016",e[e.ES2017=4]="ES2017",e[e.ES2018=5]="ES2018",e[e.ES2019=6]="ES2019",e[e.ES2020=7]="ES2020",e[e.ESNext=99]="ESNext",e[e.JSON=100]="JSON",e[e.Latest=99]="Latest",e))(c||{}),g=(e=>(e[e.Classic=1]="Classic",e[e.NodeJs=2]="NodeJs",e))(g||{}),p=class{constructor(e,i,t,s,r){this._onDidChange=new n.Emitter,this._onDidExtraLibsChange=new n.Emitter,this._extraLibs=Object.create(null),this._removedExtraLibs=Object.create(null),this._eagerModelSync=!1,this.setCompilerOptions(e),this.setDiagnosticsOptions(i),this.setWorkerOptions(t),this.setInlayHintsOptions(s),this.setModeConfiguration(r),this._onDidExtraLibsChangeTimeout=-1}get onDidChange(){return this._onDidChange.event}get onDidExtraLibsChange(){return this._onDidExtraLibsChange.event}get modeConfiguration(){return this._modeConfiguration}get workerOptions(){return this._workerOptions}get inlayHintsOptions(){return this._inlayHintsOptions}getExtraLibs(){return this._extraLibs}addExtraLib(e,i){let t;if(typeof i>"u"?t=`ts:extralib-${Math.random().toString(36).substring(2,15)}`:t=i,this._extraLibs[t]&&this._extraLibs[t].content===e)return{dispose:()=>{}};let s=1;return this._removedExtraLibs[t]&&(s=this._removedExtraLibs[t]+1),this._extraLibs[t]&&(s=this._extraLibs[t].version+1),this._extraLibs[t]={content:e,version:s},this._fireOnDidExtraLibsChangeSoon(),{dispose:()=>{let r=this._extraLibs[t];!r||r.version===s&&(delete this._extraLibs[t],this._removedExtraLibs[t]=s,this._fireOnDidExtraLibsChangeSoon())}}}setExtraLibs(e){for(let i in this._extraLibs)this._removedExtraLibs[i]=this._extraLibs[i].version;if(this._extraLibs=Object.create(null),e&&e.length>0)for(let i of e){let t=i.filePath||`ts:extralib-${Math.random().toString(36).substring(2,15)}`,s=i.content,r=1;this._removedExtraLibs[t]&&(r=this._removedExtraLibs[t]+1),this._extraLibs[t]={content:s,version:r}}this._fireOnDidExtraLibsChangeSoon()}_fireOnDidExtraLibsChangeSoon(){this._onDidExtraLibsChangeTimeout===-1&&(this._onDidExtraLibsChangeTimeout=window.setTimeout(()=>{this._onDidExtraLibsChangeTimeout=-1,this._onDidExtraLibsChange.fire(void 0)},0))}getCompilerOptions(){return this._compilerOptions}setCompilerOptions(e){this._compilerOptions=e||Object.create(null),this._onDidChange.fire(void 0)}getDiagnosticsOptions(){return this._diagnosticsOptions}setDiagnosticsOptions(e){this._diagnosticsOptions=e||Object.create(null),this._onDidChange.fire(void 0)}setWorkerOptions(e){this._workerOptions=e||Object.create(null),this._onDidChange.fire(void 0)}setInlayHintsOptions(e){this._inlayHintsOptions=e||Object.create(null),this._onDidChange.fire(void 0)}setMaximumWorkerIdleTime(e){}setEagerModelSync(e){this._eagerModelSync=e}getEagerModelSync(){return this._eagerModelSync}setModeConfiguration(e){this._modeConfiguration=e||Object.create(null),this._onDidChange.fire(void 0)}},x=L,b={completionItems:!0,hovers:!0,documentSymbols:!0,definitions:!0,references:!0,documentHighlights:!0,rename:!0,diagnostics:!0,documentRangeFormattingEdits:!0,signatureHelp:!0,onTypeFormattingEdits:!0,codeActions:!0,inlayHints:!0},v=new p({allowNonTsExtensions:!0,target:99},{noSemanticValidation:!1,noSyntaxValidation:!1,onlyVisible:!1},{},{},b),f=new p({allowNonTsExtensions:!0,allowJs:!0,target:99},{noSemanticValidation:!0,noSyntaxValidation:!1,onlyVisible:!1},{},{},b),C=()=>a().then(e=>e.getTypeScriptWorker()),D=()=>a().then(e=>e.getJavaScriptWorker());n.languages.typescript={ModuleKind:u,JsxEmit:l,NewLineKind:_,ScriptTarget:c,ModuleResolutionKind:g,typescriptVersion:x,typescriptDefaults:v,javascriptDefaults:f,getTypeScriptWorker:C,getJavaScriptWorker:D};function a(){return import("./tsMode-43DEU3CA.js")}n.languages.onLanguage("typescript",()=>a().then(e=>e.setupTypeScript(v)));n.languages.onLanguage("javascript",()=>a().then(e=>e.setupJavaScript(f)));export{v as a};
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.50.0(c321d0fbecb50ab8a5365fa1965476b0ae63fc87)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/