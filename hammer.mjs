import * as Packages from './build/packages'
import * as Monaco from './build/monaco'

// --------------------------------------------------------------------------------------
// Libraries
// --------------------------------------------------------------------------------------
const libraries = ['@sinclair/typebox', 'effect', '@effect/schema', 'arktype', 'zod', 'io-ts', 'fp-ts', 'yup', 'valibot', 'yrel']

// --------------------------------------------------------------------------------------
// Clean
// --------------------------------------------------------------------------------------
export async function clean() {
  await folder('docs').delete()
}
// -------------------------------------------------------------------------------
// Format
// -------------------------------------------------------------------------------
export async function format() {
  await shell('prettier --no-semi --single-quote --print-width 240 --trailing-comma all --write src hammer.mjs')
}
// --------------------------------------------------------------------------------------
// Start
// --------------------------------------------------------------------------------------
export async function start() {
  await clean()
  await Monaco.buildWorkers()
  await Packages.addPackages(libraries)
  const drift = shell('drift window url http://localhost:5000 size 1280 980 wait 6000 save workbench.png')
  const serve = shell('hammer serve src/index.html --dist docs --minify --external assert')
  await Promise.all([drift, serve])
}
