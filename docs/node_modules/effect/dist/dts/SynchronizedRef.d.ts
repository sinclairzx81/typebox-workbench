/**
 * @since 2.0.0
 */
import type * as Effect from "./Effect.js";
import type * as Option from "./Option.js";
import type * as Ref from "./Ref.js";
import type * as Types from "./Types.js";
/**
 * @since 2.0.0
 * @category symbols
 */
export declare const SynchronizedRefTypeId: unique symbol;
/**
 * @since 2.0.0
 * @category symbols
 */
export type SynchronizedRefTypeId = typeof SynchronizedRefTypeId;
/**
 * @since 2.0.0
 * @category models
 */
export interface SynchronizedRef<in out A> extends SynchronizedRef.Variance<A>, Ref.Ref<A> {
    modifyEffect<B, E, R>(f: (a: A) => Effect.Effect<readonly [B, A], E, R>): Effect.Effect<B, E, R>;
}
/**
 * @since 2.0.0
 */
export declare namespace SynchronizedRef {
    /**
     * @since 2.0.0
     * @category models
     */
    interface Variance<in out A> {
        readonly [SynchronizedRefTypeId]: {
            readonly _A: Types.Invariant<A>;
        };
    }
}
/**
 * @since 2.0.0
 * @category constructors
 */
export declare const make: <A>(value: A) => Effect.Effect<SynchronizedRef<A>>;
/**
 * @since 2.0.0
 * @category getters
 */
export declare const get: <A>(self: SynchronizedRef<A>) => Effect.Effect<A>;
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndSet: {
    <A>(value: A): (self: Ref.Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref.Ref<A>, value: A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndUpdate: {
    <A>(f: (a: A) => A): (self: Ref.Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref.Ref<A>, f: (a: A) => A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndUpdateEffect: {
    <A, R, E>(f: (a: A) => Effect.Effect<A, E, R>): (self: SynchronizedRef<A>) => Effect.Effect<A, E, R>;
    <A, R, E>(self: SynchronizedRef<A>, f: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<A, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndUpdateSome: {
    <A>(pf: (a: A) => Option.Option<A>): (self: Ref.Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref.Ref<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndUpdateSomeEffect: {
    <A, R, E>(pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): (self: SynchronizedRef<A>) => Effect.Effect<A, E, R>;
    <A, R, E>(self: SynchronizedRef<A>, pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): Effect.Effect<A, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const modify: {
    <A, B>(f: (a: A) => readonly [B, A]): (self: SynchronizedRef<A>) => Effect.Effect<B>;
    <A, B>(self: SynchronizedRef<A>, f: (a: A) => readonly [B, A]): Effect.Effect<B>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const modifyEffect: {
    <A, B, E, R>(f: (a: A) => Effect.Effect<readonly [B, A], E, R>): (self: SynchronizedRef<A>) => Effect.Effect<B, E, R>;
    <A, B, E, R>(self: SynchronizedRef<A>, f: (a: A) => Effect.Effect<readonly [B, A], E, R>): Effect.Effect<B, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const modifySome: {
    <B, A>(fallback: B, pf: (a: A) => Option.Option<readonly [B, A]>): (self: Ref.Ref<A>) => Effect.Effect<B>;
    <A, B>(self: Ref.Ref<A>, fallback: B, pf: (a: A) => Option.Option<readonly [B, A]>): Effect.Effect<B>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const modifySomeEffect: {
    <A, B, R, E>(fallback: B, pf: (a: A) => Option.Option<Effect.Effect<readonly [B, A], E, R>>): (self: SynchronizedRef<A>) => Effect.Effect<B, E, R>;
    <A, B, R, E>(self: SynchronizedRef<A>, fallback: B, pf: (a: A) => Option.Option<Effect.Effect<readonly [B, A], E, R>>): Effect.Effect<B, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const set: {
    <A>(value: A): (self: Ref.Ref<A>) => Effect.Effect<void>;
    <A>(self: Ref.Ref<A>, value: A): Effect.Effect<void>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const setAndGet: {
    <A>(value: A): (self: Ref.Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref.Ref<A>, value: A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const update: {
    <A>(f: (a: A) => A): (self: Ref.Ref<A>) => Effect.Effect<void>;
    <A>(self: Ref.Ref<A>, f: (a: A) => A): Effect.Effect<void>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateEffect: {
    <A, R, E>(f: (a: A) => Effect.Effect<A, E, R>): (self: SynchronizedRef<A>) => Effect.Effect<void, E, R>;
    <A, R, E>(self: SynchronizedRef<A>, f: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<void, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateAndGet: {
    <A>(f: (a: A) => A): (self: Ref.Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref.Ref<A>, f: (a: A) => A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateAndGetEffect: {
    <A, R, E>(f: (a: A) => Effect.Effect<A, E, R>): (self: SynchronizedRef<A>) => Effect.Effect<A, E, R>;
    <A, R, E>(self: SynchronizedRef<A>, f: (a: A) => Effect.Effect<A, E, R>): Effect.Effect<A, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateSome: {
    <A>(f: (a: A) => Option.Option<A>): (self: Ref.Ref<A>) => Effect.Effect<void>;
    <A>(self: Ref.Ref<A>, f: (a: A) => Option.Option<A>): Effect.Effect<void>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateSomeEffect: {
    <A, R, E>(pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): (self: SynchronizedRef<A>) => Effect.Effect<void, E, R>;
    <A, R, E>(self: SynchronizedRef<A>, pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): Effect.Effect<void, E, R>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateSomeAndGet: {
    <A>(pf: (a: A) => Option.Option<A>): (self: Ref.Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref.Ref<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateSomeAndGetEffect: {
    <A, R, E>(pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): (self: SynchronizedRef<A>) => Effect.Effect<A, E, R>;
    <A, R, E>(self: SynchronizedRef<A>, pf: (a: A) => Option.Option<Effect.Effect<A, E, R>>): Effect.Effect<A, E, R>;
};
/**
 * @since 2.0.0
 * @category unsafe
 */
export declare const unsafeMake: <A>(value: A) => SynchronizedRef<A>;
//# sourceMappingURL=SynchronizedRef.d.ts.map