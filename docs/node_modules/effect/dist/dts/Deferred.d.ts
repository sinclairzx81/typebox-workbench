/**
 * @since 2.0.0
 */
import type * as Cause from "./Cause.js";
import type * as Effect from "./Effect.js";
import type * as Exit from "./Exit.js";
import type * as FiberId from "./FiberId.js";
import type { LazyArg } from "./Function.js";
import type * as Option from "./Option.js";
import type { Pipeable } from "./Pipeable.js";
import type * as Types from "./Types.js";
/**
 * @since 2.0.0
 * @category symbols
 */
export declare const DeferredTypeId: unique symbol;
/**
 * @since 2.0.0
 * @category symbols
 */
export type DeferredTypeId = typeof DeferredTypeId;
/**
 * A `Deferred` represents an asynchronous variable that can be set exactly
 * once, with the ability for an arbitrary number of fibers to suspend (by
 * calling `Deferred.await`) and automatically resume when the variable is set.
 *
 * `Deferred` can be used for building primitive actions whose completions
 * require the coordinated action of multiple fibers, and for building
 * higher-level concurrent or asynchronous structures.
 *
 * @since 2.0.0
 * @category models
 */
export interface Deferred<in out A, in out E = never> extends Deferred.Variance<A, E>, Pipeable {
}
/**
 * @since 2.0.0
 */
export declare namespace Deferred {
    /**
     * @since 2.0.0
     * @category models
     */
    interface Variance<in out A, in out E> {
        readonly [DeferredTypeId]: {
            readonly _A: Types.Invariant<A>;
            readonly _E: Types.Invariant<E>;
        };
    }
}
/**
 * Creates a new `Deferred`.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const make: <A, E = never>() => Effect.Effect<Deferred<A, E>>;
/**
 * Creates a new `Deferred` from the specified `FiberId`.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const makeAs: <A, E = never>(fiberId: FiberId.FiberId) => Effect.Effect<Deferred<A, E>>;
declare const _await: <A, E>(self: Deferred<A, E>) => Effect.Effect<A, E>;
export { 
/**
 * Retrieves the value of the `Deferred`, suspending the fiber running the
 * workflow until the result is available.
 *
 * @since 2.0.0
 * @category getters
 */
_await as await };
/**
 * Completes the deferred with the result of the specified effect. If the
 * deferred has already been completed, the method will produce false.
 *
 * Note that `Deferred.completeWith` will be much faster, so consider using
 * that if you do not need to memoize the result of the specified effect.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const complete: {
    <A, E>(effect: Effect.Effect<A, E>): (self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, effect: Effect.Effect<A, E>): Effect.Effect<boolean>;
};
/**
 * Completes the deferred with the result of the specified effect. If the
 * deferred has already been completed, the method will produce false.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const completeWith: {
    <A, E>(effect: Effect.Effect<A, E>): (self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, effect: Effect.Effect<A, E>): Effect.Effect<boolean>;
};
/**
 * Exits the `Deferred` with the specified `Exit` value, which will be
 * propagated to all fibers waiting on the value of the `Deferred`.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const done: {
    <A, E>(exit: Exit.Exit<A, E>): (self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, exit: Exit.Exit<A, E>): Effect.Effect<boolean>;
};
/**
 * Fails the `Deferred` with the specified error, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const fail: {
    <E>(error: E): <A>(self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, error: E): Effect.Effect<boolean>;
};
/**
 * Fails the `Deferred` with the specified error, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const failSync: {
    <E>(evaluate: LazyArg<E>): <A>(self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, evaluate: LazyArg<E>): Effect.Effect<boolean>;
};
/**
 * Fails the `Deferred` with the specified `Cause`, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const failCause: {
    <E>(cause: Cause.Cause<E>): <A>(self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, cause: Cause.Cause<E>): Effect.Effect<boolean>;
};
/**
 * Fails the `Deferred` with the specified `Cause`, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const failCauseSync: {
    <E>(evaluate: LazyArg<Cause.Cause<E>>): <A>(self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, evaluate: LazyArg<Cause.Cause<E>>): Effect.Effect<boolean>;
};
/**
 * Kills the `Deferred` with the specified defect, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const die: {
    (defect: unknown): <A, E>(self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, defect: unknown): Effect.Effect<boolean>;
};
/**
 * Kills the `Deferred` with the specified defect, which will be propagated to
 * all fibers waiting on the value of the `Deferred`.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const dieSync: {
    (evaluate: LazyArg<unknown>): <A, E>(self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, evaluate: LazyArg<unknown>): Effect.Effect<boolean>;
};
/**
 * Completes the `Deferred` with interruption. This will interrupt all fibers
 * waiting on the value of the `Deferred` with the `FiberId` of the fiber
 * calling this method.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const interrupt: <A, E>(self: Deferred<A, E>) => Effect.Effect<boolean>;
/**
 * Completes the `Deferred` with interruption. This will interrupt all fibers
 * waiting on the value of the `Deferred` with the specified `FiberId`.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const interruptWith: {
    (fiberId: FiberId.FiberId): <A, E>(self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, fiberId: FiberId.FiberId): Effect.Effect<boolean>;
};
/**
 * Returns `true` if this `Deferred` has already been completed with a value or
 * an error, `false` otherwise.
 *
 * @since 2.0.0
 * @category getters
 */
export declare const isDone: <A, E>(self: Deferred<A, E>) => Effect.Effect<boolean>;
/**
 * Returns a `Some<Effect<A, E, R>>` from the `Deferred` if this `Deferred` has
 * already been completed, `None` otherwise.
 *
 * @since 2.0.0
 * @category getters
 */
export declare const poll: <A, E>(self: Deferred<A, E>) => Effect.Effect<Option.Option<Effect.Effect<A, E>>>;
/**
 * Completes the `Deferred` with the specified value.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const succeed: {
    <A>(value: A): <E>(self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, value: A): Effect.Effect<boolean>;
};
/**
 * Completes the `Deferred` with the specified lazily evaluated value.
 *
 * @since 2.0.0
 * @category utils
 */
export declare const sync: {
    <A>(evaluate: LazyArg<A>): <E>(self: Deferred<A, E>) => Effect.Effect<boolean>;
    <A, E>(self: Deferred<A, E>, evaluate: LazyArg<A>): Effect.Effect<boolean>;
};
/**
 * Unsafely creates a new `Deferred` from the specified `FiberId`.
 *
 * @since 2.0.0
 * @category unsafe
 */
export declare const unsafeMake: <A, E = never>(fiberId: FiberId.FiberId) => Deferred<A, E>;
/**
 * Unsafely exits the `Deferred` with the specified `Exit` value, which will be
 * propagated to all fibers waiting on the value of the `Deferred`.
 *
 * @since 2.0.0
 * @category unsafe
 */
export declare const unsafeDone: <A, E>(self: Deferred<A, E>, effect: Effect.Effect<A, E>) => void;
//# sourceMappingURL=Deferred.d.ts.map