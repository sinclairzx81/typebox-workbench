/**
 * @since 2.0.0
 */
import type * as Effect from "./Effect.js";
import type * as Option from "./Option.js";
import type * as Stream from "./Stream.js";
import type { Subscribable } from "./Subscribable.js";
import * as Synchronized from "./SynchronizedRef.js";
import type * as Types from "./Types.js";
/**
 * @since 2.0.0
 * @category symbols
 */
export declare const SubscriptionRefTypeId: unique symbol;
/**
 * @since 2.0.0
 * @category symbols
 */
export type SubscriptionRefTypeId = typeof SubscriptionRefTypeId;
/**
 * A `SubscriptionRef<A>` is a `Ref` that can be subscribed to in order to
 * receive the current value as well as all changes to the value.
 *
 * @since 2.0.0
 * @category models
 */
export interface SubscriptionRef<in out A> extends SubscriptionRef.Variance<A>, Synchronized.SynchronizedRef<A>, Subscribable<A> {
    /**
     * A stream containing the current value of the `Ref` as well as all changes
     * to that value.
     */
    readonly changes: Stream.Stream<A>;
}
/**
 * @since 2.0.0
 */
export declare namespace SubscriptionRef {
    /**
     * @since 2.0.0
     * @category models
     */
    interface Variance<in out A> {
        readonly [SubscriptionRefTypeId]: {
            readonly _A: Types.Invariant<A>;
        };
    }
}
/**
 * @since 2.0.0
 * @category getters
 */
export declare const get: <A>(self: SubscriptionRef<A>) => Effect.Effect<A>;
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndSet: {
    <A>(value: A): (self: SubscriptionRef<A>) => Effect.Effect<A>;
    <A>(self: SubscriptionRef<A>, value: A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndUpdate: {
    <A>(f: (a: A) => A): (self: SubscriptionRef<A>) => Effect.Effect<A>;
    <A>(self: SubscriptionRef<A>, f: (a: A) => A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndUpdateEffect: {
    <A, R, E>(f: (a: A) => Effect.Effect<A, E, R>): (self: SubscriptionRef<A>) => Effect.Effect<A, E, R>;
    <A, R, E>(self: SubscriptionRef<A>, f: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<A, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndUpdateSome: {
    <A>(pf: (a: A) => Option.Option<A>): (self: SubscriptionRef<A>) => Effect.Effect<A>;
    <A>(self: SubscriptionRef<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndUpdateSomeEffect: {
    <A, R, E>(pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): (self: SubscriptionRef<A>) => Effect.Effect<A, E, R>;
    <A, R, E>(self: SubscriptionRef<A>, pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): Effect.Effect<A, E, R>;
};
/**
 * Creates a new `SubscriptionRef` with the specified value.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const make: <A>(value: A) => Effect.Effect<SubscriptionRef<A>>;
/**
 * @since 2.0.0
 * @category utils
 */
export declare const modify: {
    <A, B>(f: (a: A) => readonly [B, A]): (self: SubscriptionRef<A>) => Effect.Effect<B>;
    <A, B>(self: SubscriptionRef<A>, f: (a: A) => readonly [B, A]): Effect.Effect<B>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const modifyEffect: {
    <B, A, E, R>(f: (a: A) => Effect.Effect<readonly [B, A], E, R>): (self: SubscriptionRef<A>) => Effect.Effect<B, E, R>;
    <A, B, E, R>(self: SubscriptionRef<A>, f: (a: A) => Effect.Effect<readonly [B, A], E, R>): Effect.Effect<B, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const modifySome: {
    <B, A>(fallback: B, pf: (a: A) => Option.Option<readonly [B, A]>): (self: SubscriptionRef<A>) => Effect.Effect<B>;
    <A, B>(self: SubscriptionRef<A>, fallback: B, pf: (a: A) => Option.Option<readonly [B, A]>): Effect.Effect<B>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const modifySomeEffect: {
    <A, B, R, E>(fallback: B, pf: (a: A) => Option.Option<Effect.Effect<readonly [B, A], E, R>>): (self: Synchronized.SynchronizedRef<A>) => Effect.Effect<B, E, R>;
    <A, B, R, E>(self: Synchronized.SynchronizedRef<A>, fallback: B, pf: (a: A) => Option.Option<Effect.Effect<readonly [B, A], E, R>>): Effect.Effect<B, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const set: {
    <A>(value: A): (self: SubscriptionRef<A>) => Effect.Effect<void>;
    <A>(self: SubscriptionRef<A>, value: A): Effect.Effect<void>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const setAndGet: {
    <A>(value: A): (self: SubscriptionRef<A>) => Effect.Effect<A>;
    <A>(self: SubscriptionRef<A>, value: A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const update: {
    <A>(f: (a: A) => A): (self: SubscriptionRef<A>) => Effect.Effect<void>;
    <A>(self: SubscriptionRef<A>, f: (a: A) => A): Effect.Effect<void>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateEffect: {
    <A, R, E>(f: (a: A) => Effect.Effect<A, E, R>): (self: Synchronized.SynchronizedRef<A>) => Effect.Effect<void, E, R>;
    <A, R, E>(self: Synchronized.SynchronizedRef<A>, f: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<void, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateAndGet: {
    <A>(f: (a: A) => A): (self: SubscriptionRef<A>) => Effect.Effect<A>;
    <A>(self: SubscriptionRef<A>, f: (a: A) => A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateAndGetEffect: {
    <A, R, E>(f: (a: A) => Effect.Effect<A, E, R>): (self: SubscriptionRef<A>) => Effect.Effect<A, E, R>;
    <A, R, E>(self: SubscriptionRef<A>, f: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<A, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateSome: {
    <A>(f: (a: A) => Option.Option<A>): (self: SubscriptionRef<A>) => Effect.Effect<void>;
    <A>(self: SubscriptionRef<A>, f: (a: A) => Option.Option<A>): Effect.Effect<void>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateSomeEffect: {
    <A, R, E>(pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): (self: Synchronized.SynchronizedRef<A>) => Effect.Effect<void, E, R>;
    <A, R, E>(self: Synchronized.SynchronizedRef<A>, pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): Effect.Effect<void, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateSomeAndGet: {
    <A>(pf: (a: A) => Option.Option<A>): (self: SubscriptionRef<A>) => Effect.Effect<A>;
    <A>(self: SubscriptionRef<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateSomeAndGetEffect: {
    <A, R, E>(pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): (self: SubscriptionRef<A>) => Effect.Effect<A, E, R>;
    <A, R, E>(self: SubscriptionRef<A>, pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): Effect.Effect<A, E, R>;
};
//# sourceMappingURL=SubscriptionRef.d.ts.map