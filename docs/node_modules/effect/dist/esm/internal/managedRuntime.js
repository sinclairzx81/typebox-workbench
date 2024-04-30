import { pipeArguments } from "../Pipeable.js";
import * as Scope from "../Scope.js";
import * as effect from "./core-effect.js";
import * as core from "./core.js";
import * as fiberRuntime from "./fiberRuntime.js";
import * as internalLayer from "./layer.js";
import * as internalRuntime from "./runtime.js";
function provide(managed, effect) {
  return core.flatMap(managed.runtimeEffect, rt => core.withFiberRuntime(fiber => {
    fiber.setFiberRefs(rt.fiberRefs);
    fiber._runtimeFlags = rt.runtimeFlags;
    return core.provideContext(effect, rt.context);
  }));
}
/** @internal */
export const make = (layer, memoMap) => {
  memoMap = memoMap ?? internalLayer.unsafeMakeMemoMap();
  const scope = internalRuntime.unsafeRunSyncEffect(fiberRuntime.scopeMake());
  const self = {
    memoMap,
    scope,
    runtimeEffect: internalRuntime.unsafeRunSyncEffect(effect.memoize(core.tap(Scope.extend(internalLayer.toRuntimeWithMemoMap(layer, memoMap), scope), rt => {
      self.cachedRuntime = rt;
    }))),
    cachedRuntime: undefined,
    pipe() {
      return pipeArguments(this, arguments);
    },
    runtime() {
      return self.cachedRuntime === undefined ? internalRuntime.unsafeRunPromiseEffect(self.runtimeEffect) : Promise.resolve(self.cachedRuntime);
    },
    dispose() {
      return internalRuntime.unsafeRunPromiseEffect(self.disposeEffect);
    },
    disposeEffect: core.suspend(() => {
      ;
      self.runtime = core.die("ManagedRuntime disposed");
      self.cachedRuntime = undefined;
      return Scope.close(self.scope, core.exitVoid);
    }),
    runFork(effect, options) {
      return self.cachedRuntime === undefined ? internalRuntime.unsafeForkEffect(provide(self, effect), options) : internalRuntime.unsafeFork(self.cachedRuntime)(effect, options);
    },
    runSyncExit(effect) {
      return self.cachedRuntime === undefined ? internalRuntime.unsafeRunSyncExitEffect(provide(self, effect)) : internalRuntime.unsafeRunSyncExit(self.cachedRuntime)(effect);
    },
    runSync(effect) {
      return self.cachedRuntime === undefined ? internalRuntime.unsafeRunSyncEffect(provide(self, effect)) : internalRuntime.unsafeRunSync(self.cachedRuntime)(effect);
    },
    runPromiseExit(effect, options) {
      return self.cachedRuntime === undefined ? internalRuntime.unsafeRunPromiseExitEffect(provide(self, effect), options) : internalRuntime.unsafeRunPromiseExit(self.cachedRuntime)(effect, options);
    },
    runCallback(effect, options) {
      return self.cachedRuntime === undefined ? internalRuntime.unsafeRunCallback(internalRuntime.defaultRuntime)(provide(self, effect), options) : internalRuntime.unsafeRunCallback(self.cachedRuntime)(effect, options);
    },
    runPromise(effect, options) {
      return self.cachedRuntime === undefined ? internalRuntime.unsafeRunPromiseEffect(provide(self, effect), options) : internalRuntime.unsafeRunPromise(self.cachedRuntime)(effect, options);
    }
  };
  return self;
};
//# sourceMappingURL=managedRuntime.js.map