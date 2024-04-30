import { identity, pipe } from "../Function.js";
import * as core from "./core.js";
import * as fiberRuntime from "./fiberRuntime.js";
import * as _schedule from "./schedule.js";
import * as scopedRef from "./scopedRef.js";
/** @internal */
const ResourceSymbolKey = "effect/Resource";
/** @internal */
export const ResourceTypeId = /*#__PURE__*/Symbol.for(ResourceSymbolKey);
const resourceVariance = {
  /* c8 ignore next */
  _E: _ => _,
  /* c8 ignore next */
  _A: _ => _
};
/** @internal */
export const auto = (acquire, policy) => core.tap(manual(acquire), manual => fiberRuntime.acquireRelease(pipe(refresh(manual), _schedule.schedule_Effect(policy), core.interruptible, fiberRuntime.forkDaemon), core.interruptFiber));
/** @internal */
export const manual = acquire => core.flatMap(core.context(), env => pipe(scopedRef.fromAcquire(core.exit(acquire)), core.map(ref => ({
  [ResourceTypeId]: resourceVariance,
  scopedRef: ref,
  acquire: core.provideContext(acquire, env)
}))));
/** @internal */
export const get = self => core.flatMap(scopedRef.get(self.scopedRef), identity);
/** @internal */
export const refresh = self => scopedRef.set(self.scopedRef, core.map(self.acquire, core.exitSucceed));
//# sourceMappingURL=resource.js.map