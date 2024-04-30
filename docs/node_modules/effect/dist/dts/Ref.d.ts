/**
 * @since 2.0.0
 */
import type * as Effect from "./Effect.js";
import type * as Option from "./Option.js";
import type { Readable } from "./Readable.js";
import type * as Types from "./Types.js";
/**
 * @since 2.0.0
 * @category symbols
 */
export declare const RefTypeId: unique symbol;
/**
 * @since 2.0.0
 * @category symbols
 */
export type RefTypeId = typeof RefTypeId;
/**
 * @since 2.0.0
 * @category models
 */
export interface Ref<in out A> extends Ref.Variance<A>, Readable<A> {
    modify<B>(f: (a: A) => readonly [B, A]): Effect.Effect<B>;
}
/**
 * @since 2.0.0
 * @category models
 */
export declare namespace Ref {
    /**
     * @since 2.0.0
     */
    interface Variance<in out A> {
        readonly [RefTypeId]: {
            readonly _A: Types.Invariant<A>;
        };
    }
}
/**
 * @since 2.0.0
 * @category constructors
 */
export declare const make: <A>(value: A) => Effect.Effect<Ref<A>>;
/**
 * @since 2.0.0
 * @category getters
 */
export declare const get: <A>(self: Ref<A>) => Effect.Effect<A>;
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndSet: {
    <A>(value: A): (self: Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref<A>, value: A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndUpdate: {
    <A>(f: (a: A) => A): (self: Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref<A>, f: (a: A) => A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const getAndUpdateSome: {
    <A>(pf: (a: A) => Option.Option<A>): (self: Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const modify: {
    <A, B>(f: (a: A) => readonly [B, A]): (self: Ref<A>) => Effect.Effect<B>;
    <A, B>(self: Ref<A>, f: (a: A) => readonly [B, A]): Effect.Effect<B>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const modifySome: {
    <B, A>(fallback: B, pf: (a: A) => Option.Option<readonly [B, A]>): (self: Ref<A>) => Effect.Effect<B>;
    <A, B>(self: Ref<A>, fallback: B, pf: (a: A) => Option.Option<readonly [B, A]>): Effect.Effect<B>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const set: {
    <A>(value: A): (self: Ref<A>) => Effect.Effect<void>;
    <A>(self: Ref<A>, value: A): Effect.Effect<void>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const setAndGet: {
    <A>(value: A): (self: Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref<A>, value: A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const update: {
    <A>(f: (a: A) => A): (self: Ref<A>) => Effect.Effect<void>;
    <A>(self: Ref<A>, f: (a: A) => A): Effect.Effect<void>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateAndGet: {
    <A>(f: (a: A) => A): (self: Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref<A>, f: (a: A) => A): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateSome: {
    <A>(f: (a: A) => Option.Option<A>): (self: Ref<A>) => Effect.Effect<void>;
    <A>(self: Ref<A>, f: (a: A) => Option.Option<A>): Effect.Effect<void>;
};
/**
 * @since 2.0.0
 * @category utils
 */
export declare const updateSomeAndGet: {
    <A>(pf: (a: A) => Option.Option<A>): (self: Ref<A>) => Effect.Effect<A>;
    <A>(self: Ref<A>, pf: (a: A) => Option.Option<A>): Effect.Effect<A>;
};
/**
 * @since 2.0.0
 * @category unsafe
 */
export declare const unsafeMake: <A>(value: A) => Ref<A>;
//# sourceMappingURL=Ref.d.ts.map