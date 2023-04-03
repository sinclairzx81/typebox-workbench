// --------------------------------------------------------------------------------------
// Clean
// --------------------------------------------------------------------------------------
export async function clean() {
    await folder('target').delete()
}
// -------------------------------------------------------------------------------
// Format
// -------------------------------------------------------------------------------
export async function format() {
    await shell('prettier --no-semi --single-quote --print-width 240 --trailing-comma all --write website')
}
// --------------------------------------------------------------------------------------
// Start
// --------------------------------------------------------------------------------------
export async function build_monaco_workers(target = 'target/monaco-workers') {
    const root = 'node_modules/monaco-editor/esm/vs'
    await Promise.all([
        shell(`hammer build ${root}/language/json/json.worker.js --dist ${target}`),
        shell(`hammer build ${root}/language/css/css.worker.js --dist ${target}`),
        shell(`hammer build ${root}/language/html/html.worker.js --dist ${target}`),
        shell(`hammer build ${root}/language/typescript/ts.worker.js --dist ${target}`),
        shell(`hammer build ${root}/editor/editor.worker.js --dist ${target}`)
    ])
}
export async function copy_typebox(target = 'target') {
    const root = 'node_modules/@sinclair/typebox'
    await folder(root).copy(target)
}
export async function start() {
    await build_monaco_workers()
    await copy_typebox()
    await shell('hammer serve website/index.html --dist target')
}