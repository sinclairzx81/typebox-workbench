import { shell } from '@sinclair/hammer'

export async function buildWorkers(target = 'docs/monaco-workers') {
  const root = 'node_modules/monaco-editor/esm/vs'
  await Promise.all([
    shell(`hammer build ${root}/language/json/json.worker.js --dist ${target}`),
    shell(`hammer build ${root}/language/css/css.worker.js --dist ${target}`),
    shell(`hammer build ${root}/language/html/html.worker.js --dist ${target}`),
    shell(`hammer build ${root}/language/typescript/ts.worker.js --dist ${target}`),
    shell(`hammer build ${root}/editor/editor.worker.js --dist ${target}`),
  ])
}