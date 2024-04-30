/**
 * @since 2.0.0
 */
import type * as Chunk from "./Chunk.js";
import type * as HashSet from "./HashSet.js";
import type * as Option from "./Option.js";
import type { Predicate } from "./Predicate.js";
import type * as STM from "./STM.js";
import type * as Types from "./Types.js";
/**
 * @since 2.0.0
 * @category symbols
 */
export declare const TSetTypeId: unique symbol;
/**
 * @since 2.0.0
 * @category symbols
 */
export type TSetTypeId = typeof TSetTypeId;
/**
 * Transactional set implemented on top of `TMap`.
 *
 * @since 2.0.0
 * @category models
 */
export interface TSet<in out A> extends TSet.Variance<A> {
}
/**
 * @since 2.0.0
 */
export declare namespace TSet {
    /**
     * @since 2.0.0
     * @category models
     */
    interface Variance<in out A> {
        readonly [TSetTypeId]: {
            readonly _A: Types.Invariant<A>;
        };
    }
}
/**
 * Stores new element in the set.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const add: {
    <A>(value: A): (self: TSet<A>) => STM.STM<void>;
    <A>(self: TSet<A>, value: A): STM.STM<void>;
};
/**
 * Atomically transforms the set into the difference of itself and the
 * provided set.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const difference: {
    <A>(other: TSet<A>): (self: TSet<A>) => STM.STM<void>;
    <A>(self: TSet<A>, other: TSet<A>): STM.STM<void>;
};
/**
 * Makes an empty `TSet`.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const empty: <A>() => STM.STM<TSet<A>>;
/**
 * Atomically performs transactional-effect for each element in set.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const forEach: {
    <A, R, E>(f: (value: A) => STM.STM<void, E, R>): (self: TSet<A>) => STM.STM<void, E, R>;
    <A, R, E>(self: TSet<A>, f: (value: A) => STM.STM<void, E, R>): STM.STM<void, E, R>;
};
/**
 * Creates a new `TSet` from an iterable collection of values.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const fromIterable: <A>(iterable: Iterable<A>) => STM.STM<TSet<A>>;
/**
 * Tests whether or not set contains an element.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const has: {
    <A>(value: A): (self: TSet<A>) => STM.STM<boolean>;
    <A>(self: TSet<A>, value: A): STM.STM<boolean>;
};
/**
 * Atomically transforms the set into the intersection of itself and the
 * provided set.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const intersection: {
    <A>(other: TSet<A>): (self: TSet<A>) => STM.STM<void>;
    <A>(self: TSet<A>, other: TSet<A>): STM.STM<void>;
};
/**
 * Tests if the set is empty or not
 *
 * @since 2.0.0
 * @category getters
 */
export declare const isEmpty: <A>(self: TSet<A>) => STM.STM<boolean>;
/**
 * Makes a new `TSet` that is initialized with specified values.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const make: <Elements extends Array<any>>(...elements: Elements) => STM.STM<TSet<Elements[number]>>;
/**
 * Atomically folds using a pure function.
 *
 * @since 2.0.0
 * @category folding
 */
export declare const reduce: {
    <Z, A>(zero: Z, f: (accumulator: Z, value: A) => Z): (self: TSet<A>) => STM.STM<Z>;
    <Z, A>(self: TSet<A>, zero: Z, f: (accumulator: Z, value: A) => Z): STM.STM<Z>;
};
/**
 * Atomically folds using a transactional function.
 *
 * @since 2.0.0
 * @category folding
 */
export declare const reduceSTM: {
    <Z, A, R, E>(zero: Z, f: (accumulator: Z, value: A) => STM.STM<Z, E, R>): (self: TSet<A>) => STM.STM<Z, E, R>;
    <Z, A, R, E>(self: TSet<A>, zero: Z, f: (accumulator: Z, value: A) => STM.STM<Z, E, R>): STM.STM<Z, E, R>;
};
/**
 * Removes a single element from the set.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const remove: {
    <A>(value: A): (self: TSet<A>) => STM.STM<void>;
    <A>(self: TSet<A>, value: A): STM.STM<void>;
};
/**
 * Removes elements from the set.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const removeAll: {
    <A>(iterable: Iterable<A>): (self: TSet<A>) => STM.STM<void>;
    <A>(self: TSet<A>, iterable: Iterable<A>): STM.STM<void>;
};
/**
 * Removes entries from a `TSet` that satisfy the specified predicate and returns the removed entries
 * (or `void` if `discard = true`).
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const removeIf: {
    <A>(predicate: Predicate<A>, options: {
        readonly discard: true;
    }): (self: TSet<A>) => STM.STM<void>;
    <A>(predicate: Predicate<A>, options?: {
        readonly discard: false;
    }): (self: TSet<A>) => STM.STM<Array<A>>;
    <A>(self: TSet<A>, predicate: Predicate<A>, options: {
        readonly discard: true;
    }): STM.STM<void>;
    <A>(self: TSet<A>, predicate: Predicate<A>, options?: {
        readonly discard: false;
    }): STM.STM<Array<A>>;
};
/**
 * Retains entries in a `TSet` that satisfy the specified predicate and returns the removed entries
 * (or `void` if `discard = true`).
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const retainIf: {
    <A>(predicate: Predicate<A>, options: {
        readonly discard: true;
    }): (self: TSet<A>) => STM.STM<void>;
    <A>(predicate: Predicate<A>, options?: {
        readonly discard: false;
    }): (self: TSet<A>) => STM.STM<Array<A>>;
    <A>(self: TSet<A>, predicate: Predicate<A>, options: {
        readonly discard: true;
    }): STM.STM<void>;
    <A>(self: TSet<A>, predicate: Predicate<A>, options?: {
        readonly discard: false;
    }): STM.STM<Array<A>>;
};
/**
 * Returns the set's cardinality.
 *
 * @since 2.0.0
 * @category getters
 */
export declare const size: <A>(self: TSet<A>) => STM.STM<number>;
/**
 * Takes the first matching value, or retries until there is one.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const takeFirst: {
    <A, B>(pf: (a: A) => Option.Option<B>): (self: TSet<A>) => STM.STM<B>;
    <A, B>(self: TSet<A>, pf: (a: A) => Option.Option<B>): STM.STM<B>;
};
/**
 * Takes the first matching value, or retries until there is one.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const takeFirstSTM: {
    <A, B, E, R>(pf: (a: A) => STM.STM<B, Option.Option<E>, R>): (self: TSet<A>) => STM.STM<B, E, R>;
    <A, B, E, R>(self: TSet<A>, pf: (a: A) => STM.STM<B, Option.Option<E>, R>): STM.STM<B, E, R>;
};
/**
 * Takes all matching values, or retries until there is at least one.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const takeSome: {
    <A, B>(pf: (a: A) => Option.Option<B>): (self: TSet<A>) => STM.STM<[B, ...Array<B>]>;
    <A, B>(self: TSet<A>, pf: (a: A) => Option.Option<B>): STM.STM<[B, ...Array<B>]>;
};
/**
 * Takes all matching values, or retries until there is at least one.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const takeSomeSTM: {
    <A, B, E, R>(pf: (a: A) => STM.STM<B, Option.Option<E>, R>): (self: TSet<A>) => STM.STM<[B, ...Array<B>], E, R>;
    <A, B, E, R>(self: TSet<A>, pf: (a: A) => STM.STM<B, Option.Option<E>, R>): STM.STM<[B, ...Array<B>], E, R>;
};
/**
 * Collects all elements into a `Chunk`.
 *
 * @since 2.0.0
 * @category destructors
 */
export declare const toChunk: <A>(self: TSet<A>) => STM.STM<Chunk.Chunk<A>>;
/**
 * Collects all elements into a `HashSet`.
 *
 * @since 2.0.0
 * @category destructors
 */
export declare const toHashSet: <A>(self: TSet<A>) => STM.STM<HashSet.HashSet<A>>;
/**
 * Collects all elements into a `Array`.
 *
 * @since 2.0.0
 * @category destructors
 */
export declare const toArray: <A>(self: TSet<A>) => STM.STM<Array<A>>;
/**
 * Collects all elements into a `ReadonlySet`.
 *
 * @since 2.0.0
 * @category destructors
 */
export declare const toReadonlySet: <A>(self: TSet<A>) => STM.STM<ReadonlySet<A>>;
/**
 * Atomically updates all elements using a pure function.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const transform: {
    <A>(f: (a: A) => A): (self: TSet<A>) => STM.STM<void>;
    <A>(self: TSet<A>, f: (a: A) => A): STM.STM<void>;
};
/**
 * Atomically updates all elements using a transactional function.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const transformSTM: {
    <A, R, E>(f: (a: A) => STM.STM<A, E, R>): (self: TSet<A>) => STM.STM<void, E, R>;
    <A, R, E>(self: TSet<A>, f: (a: A) => STM.STM<A, E, R>): STM.STM<void, E, R>;
};
/**
 * Atomically transforms the set into the union of itself and the provided
 * set.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const union: {
    <A>(other: TSet<A>): (self: TSet<A>) => STM.STM<void>;
    <A>(self: TSet<A>, other: TSet<A>): STM.STM<void>;
};
//# sourceMappingURL=TSet.d.ts.map