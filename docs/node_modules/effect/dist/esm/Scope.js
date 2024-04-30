/**
 * @since 2.0.0
 */
import * as core from "./internal/core.js";
import * as fiberRuntime from "./internal/fiberRuntime.js";
/**
 * @since 2.0.0
 * @category symbols
 */
export const ScopeTypeId = core.ScopeTypeId;
/**
 * @since 2.0.0
 * @category symbols
 */
export const CloseableScopeTypeId = core.CloseableScopeTypeId;
/**
 * @since 2.0.0
 * @category context
 */
export const Scope = fiberRuntime.scopeTag;
/**
 * Adds a finalizer to this scope. The finalizer is guaranteed to be run when
 * the scope is closed.
 *
 * @since 2.0.0
 * @category utils
 */
export const addFinalizer = core.scopeAddFinalizer;
/**
 * A simplified version of `addFinalizerWith` when the `finalizer` does not
 * depend on the `Exit` value that the scope is closed with.
 *
 * @since 2.0.0
 * @category utils
 */
export const addFinalizerExit = core.scopeAddFinalizerExit;
/**
 * Closes a scope with the specified exit value, running all finalizers that
 * have been added to the scope.
 *
 * @since 2.0.0
 * @category destructors
 */
export const close = core.scopeClose;
/**
 * Extends the scope of an `Effect` workflow that needs a scope into this
 * scope by providing it to the workflow but not closing the scope when the
 * workflow completes execution. This allows extending a scoped value into a
 * larger scope.
 *
 * @since 2.0.0
 * @category utils
 */
export const extend = fiberRuntime.scopeExtend;
/**
 * Forks a new scope that is a child of this scope. The child scope will
 * automatically be closed when this scope is closed.
 *
 * @since 2.0.0
 * @category utils
 */
export const fork = core.scopeFork;
/**
 * Uses the scope by providing it to an `Effect` workflow that needs a scope,
 * guaranteeing that the scope is closed with the result of that workflow as
 * soon as the workflow completes execution, whether by success, failure, or
 * interruption.
 *
 * @since 2.0.0
 * @category destructors
 */
export const use = fiberRuntime.scopeUse;
/**
 * Creates a Scope where Finalizers will run according to the `ExecutionStrategy`.
 *
 * If an ExecutionStrategy is not provided `sequential` will be used.
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = fiberRuntime.scopeMake;
//# sourceMappingURL=Scope.js.map