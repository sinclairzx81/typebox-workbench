/**
 * @since 2.0.0
 */
import type * as Chunk from "./Chunk.js";
import type { LazyArg } from "./Function.js";
import type * as HashMap from "./HashMap.js";
import type * as Option from "./Option.js";
import type * as STM from "./STM.js";
import type * as Types from "./Types.js";
/**
 * @since 2.0.0
 * @category symbols
 */
export declare const TMapTypeId: unique symbol;
/**
 * @since 2.0.0
 * @category symbols
 */
export type TMapTypeId = typeof TMapTypeId;
/**
 * Transactional map implemented on top of `TRef` and `TArray`. Resolves
 * conflicts via chaining.
 *
 * @since 2.0.0
 * @category models
 */
export interface TMap<in out K, in out V> extends TMap.Variance<K, V> {
}
/**
 * @since 2.0.0
 */
export declare namespace TMap {
    /**
     * @since 2.0.0
     * @category models
     */
    interface Variance<in out K, in out V> {
        readonly [TMapTypeId]: {
            readonly _K: Types.Invariant<K>;
            readonly _V: Types.Invariant<V>;
        };
    }
}
/**
 * Makes an empty `TMap`.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const empty: <K, V>() => STM.STM<TMap<K, V>>;
/**
 * Finds the key/value pair matching the specified predicate, and uses the
 * provided function to extract a value out of it.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const find: {
    <K, V, A>(pf: (key: K, value: V) => Option.Option<A>): (self: TMap<K, V>) => STM.STM<Option.Option<A>>;
    <K, V, A>(self: TMap<K, V>, pf: (key: K, value: V) => Option.Option<A>): STM.STM<Option.Option<A>>;
};
/**
 * Finds the key/value pair matching the specified predicate, and uses the
 * provided effectful function to extract a value out of it.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const findSTM: {
    <K, V, A, E, R>(f: (key: K, value: V) => STM.STM<A, Option.Option<E>, R>): (self: TMap<K, V>) => STM.STM<Option.Option<A>, E, R>;
    <K, V, A, E, R>(self: TMap<K, V>, f: (key: K, value: V) => STM.STM<A, Option.Option<E>, R>): STM.STM<Option.Option<A>, E, R>;
};
/**
 * Finds all the key/value pairs matching the specified predicate, and uses
 * the provided function to extract values out them.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const findAll: {
    <K, V, A>(pf: (key: K, value: V) => Option.Option<A>): (self: TMap<K, V>) => STM.STM<Array<A>>;
    <K, V, A>(self: TMap<K, V>, pf: (key: K, value: V) => Option.Option<A>): STM.STM<Array<A>>;
};
/**
 * Finds all the key/value pairs matching the specified predicate, and uses
 * the provided effectful function to extract values out of them..
 *
 * @since 2.0.0
 * @category elements
 */
export declare const findAllSTM: {
    <K, V, A, E, R>(pf: (key: K, value: V) => STM.STM<A, Option.Option<E>, R>): (self: TMap<K, V>) => STM.STM<Array<A>, E, R>;
    <K, V, A, E, R>(self: TMap<K, V>, pf: (key: K, value: V) => STM.STM<A, Option.Option<E>, R>): STM.STM<Array<A>, E, R>;
};
/**
 * Atomically performs transactional-effect for each binding present in map.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const forEach: {
    <K, V, X, E, R>(f: (key: K, value: V) => STM.STM<X, E, R>): (self: TMap<K, V>) => STM.STM<void, E, R>;
    <K, V, X, E, R>(self: TMap<K, V>, f: (key: K, value: V) => STM.STM<X, E, R>): STM.STM<void, E, R>;
};
/**
 * Creates a new `TMap` from an iterable collection of key/value pairs.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const fromIterable: <K, V>(iterable: Iterable<readonly [K, V]>) => STM.STM<TMap<K, V>>;
/**
 * Retrieves value associated with given key.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const get: {
    <K>(key: K): <V>(self: TMap<K, V>) => STM.STM<Option.Option<V>>;
    <K, V>(self: TMap<K, V>, key: K): STM.STM<Option.Option<V>>;
};
/**
 * Retrieves value associated with given key or default value, in case the key
 * isn't present.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const getOrElse: {
    <K, V>(key: K, fallback: LazyArg<V>): (self: TMap<K, V>) => STM.STM<V>;
    <K, V>(self: TMap<K, V>, key: K, fallback: LazyArg<V>): STM.STM<V>;
};
/**
 * Tests whether or not map contains a key.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const has: {
    <K>(key: K): <V>(self: TMap<K, V>) => STM.STM<boolean>;
    <K, V>(self: TMap<K, V>, key: K): STM.STM<boolean>;
};
/**
 * Tests if the map is empty or not.
 *
 * @since 2.0.0
 * @category getters
 */
export declare const isEmpty: <K, V>(self: TMap<K, V>) => STM.STM<boolean>;
/**
 * Collects all keys stored in map.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const keys: <K, V>(self: TMap<K, V>) => STM.STM<Array<K>>;
/**
 * Makes a new `TMap` that is initialized with specified values.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const make: <K, V>(...entries: Array<readonly [K, V]>) => STM.STM<TMap<K, V>>;
/**
 * If the key is not already associated with a value, stores the provided value,
 * otherwise merge the existing value with the new one using function `f` and
 * store the result.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const merge: {
    <K, V>(key: K, value: V, f: (x: V, y: V) => V): (self: TMap<K, V>) => STM.STM<V>;
    <K, V>(self: TMap<K, V>, key: K, value: V, f: (x: V, y: V) => V): STM.STM<V>;
};
/**
 * Atomically folds using a pure function.
 *
 * @since 2.0.0
 * @category folding
 */
export declare const reduce: {
    <Z, K, V>(zero: Z, f: (acc: Z, value: V, key: K) => Z): (self: TMap<K, V>) => STM.STM<Z>;
    <K, V, Z>(self: TMap<K, V>, zero: Z, f: (acc: Z, value: V, key: K) => Z): STM.STM<Z>;
};
/**
 * Atomically folds using a transactional function.
 *
 * @since 2.0.0
 * @category folding
 */
export declare const reduceSTM: {
    <Z, V, K, R, E>(zero: Z, f: (acc: Z, value: V, key: K) => STM.STM<Z, E, R>): (self: TMap<K, V>) => STM.STM<Z, E, R>;
    <Z, V, K, R, E>(self: TMap<K, V>, zero: Z, f: (acc: Z, value: V, key: K) => STM.STM<Z, E, R>): STM.STM<Z, E, R>;
};
/**
 * Removes binding for given key.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const remove: {
    <K>(key: K): <V>(self: TMap<K, V>) => STM.STM<void>;
    <K, V>(self: TMap<K, V>, key: K): STM.STM<void>;
};
/**
 * Deletes all entries associated with the specified keys.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const removeAll: {
    <K>(keys: Iterable<K>): <V>(self: TMap<K, V>) => STM.STM<void>;
    <K, V>(self: TMap<K, V>, keys: Iterable<K>): STM.STM<void>;
};
/**
 * Removes entries from a `TMap` that satisfy the specified predicate and returns the removed entries
 * (or `void` if `discard = true`).
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const removeIf: {
    <K, V>(predicate: (key: K, value: V) => boolean, options: {
        readonly discard: true;
    }): (self: TMap<K, V>) => STM.STM<void>;
    <K, V>(predicate: (key: K, value: V) => boolean, options?: {
        readonly discard: false;
    }): (self: TMap<K, V>) => STM.STM<Array<[K, V]>>;
    <K, V>(self: TMap<K, V>, predicate: (key: K, value: V) => boolean, options: {
        readonly discard: true;
    }): STM.STM<void>;
    <K, V>(self: TMap<K, V>, predicate: (key: K, value: V) => boolean, options?: {
        readonly discard: false;
    }): STM.STM<Array<[K, V]>>;
};
/**
 * Retains entries in a `TMap` that satisfy the specified predicate and returns the removed entries
 * (or `void` if `discard = true`).
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const retainIf: {
    <K, V>(predicate: (key: K, value: V) => boolean, options: {
        readonly discard: true;
    }): (self: TMap<K, V>) => STM.STM<void>;
    <K, V>(predicate: (key: K, value: V) => boolean, options?: {
        readonly discard: false;
    }): (self: TMap<K, V>) => STM.STM<Array<[K, V]>>;
    <K, V>(self: TMap<K, V>, predicate: (key: K, value: V) => boolean, options: {
        readonly discard: true;
    }): STM.STM<void>;
    <K, V>(self: TMap<K, V>, predicate: (key: K, value: V) => boolean, options?: {
        readonly discard: false;
    }): STM.STM<Array<[K, V]>>;
};
/**
 * Stores new binding into the map.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const set: {
    <K, V>(key: K, value: V): (self: TMap<K, V>) => STM.STM<void>;
    <K, V>(self: TMap<K, V>, key: K, value: V): STM.STM<void>;
};
/**
 * Stores new binding in the map if it does not already exist.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const setIfAbsent: {
    <K, V>(key: K, value: V): (self: TMap<K, V>) => STM.STM<void>;
    <K, V>(self: TMap<K, V>, key: K, value: V): STM.STM<void>;
};
/**
 * Returns the number of bindings.
 *
 * @since 2.0.0
 * @category getters
 */
export declare const size: <K, V>(self: TMap<K, V>) => STM.STM<number>;
/**
 * Takes the first matching value, or retries until there is one.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const takeFirst: {
    <K, V, A>(pf: (key: K, value: V) => Option.Option<A>): (self: TMap<K, V>) => STM.STM<A>;
    <K, V, A>(self: TMap<K, V>, pf: (key: K, value: V) => Option.Option<A>): STM.STM<A>;
};
/**
 * Takes the first matching value, or retries until there is one.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const takeFirstSTM: {
    <K, V, A, E, R>(pf: (key: K, value: V) => STM.STM<A, Option.Option<E>, R>): (self: TMap<K, V>) => STM.STM<A, E, R>;
    <K, V, A, E, R>(self: TMap<K, V>, pf: (key: K, value: V) => STM.STM<A, Option.Option<E>, R>): STM.STM<A, E, R>;
};
/**
 * Takes all matching values, or retries until there is at least one.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const takeSome: {
    <K, V, A>(pf: (key: K, value: V) => Option.Option<A>): (self: TMap<K, V>) => STM.STM<[A, ...Array<A>]>;
    <K, V, A>(self: TMap<K, V>, pf: (key: K, value: V) => Option.Option<A>): STM.STM<[A, ...Array<A>]>;
};
/**
 * Takes all matching values, or retries until there is at least one.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const takeSomeSTM: {
    <K, V, A, E, R>(pf: (key: K, value: V) => STM.STM<A, Option.Option<E>, R>): (self: TMap<K, V>) => STM.STM<[A, ...Array<A>], E, R>;
    <K, V, A, E, R>(self: TMap<K, V>, pf: (key: K, value: V) => STM.STM<A, Option.Option<E>, R>): STM.STM<[A, ...Array<A>], E, R>;
};
/**
 * Collects all bindings into a `Chunk`.
 *
 * @since 2.0.0
 * @category destructors
 */
export declare const toChunk: <K, V>(self: TMap<K, V>) => STM.STM<Chunk.Chunk<[K, V]>>;
/**
 * Collects all bindings into a `HashMap`.
 *
 * @since 2.0.0
 * @category destructors
 */
export declare const toHashMap: <K, V>(self: TMap<K, V>) => STM.STM<HashMap.HashMap<K, V>>;
/**
 * Collects all bindings into an `Array`.
 *
 * @since 2.0.0
 * @category destructors
 */
export declare const toArray: <K, V>(self: TMap<K, V>) => STM.STM<Array<[K, V]>>;
/**
 * Collects all bindings into a `Map`.
 *
 * @since 2.0.0
 * @category destructors
 */
export declare const toMap: <K, V>(self: TMap<K, V>) => STM.STM<ReadonlyMap<K, V>>;
/**
 * Atomically updates all bindings using a pure function.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const transform: {
    <K, V>(f: (key: K, value: V) => readonly [K, V]): (self: TMap<K, V>) => STM.STM<void>;
    <K, V>(self: TMap<K, V>, f: (key: K, value: V) => readonly [K, V]): STM.STM<void>;
};
/**
 * Atomically updates all bindings using a transactional function.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const transformSTM: {
    <K, V, R, E>(f: (key: K, value: V) => STM.STM<readonly [K, V], E, R>): (self: TMap<K, V>) => STM.STM<void, E, R>;
    <K, V, R, E>(self: TMap<K, V>, f: (key: K, value: V) => STM.STM<readonly [K, V], E, R>): STM.STM<void, E, R>;
};
/**
 * Atomically updates all values using a pure function.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const transformValues: {
    <V>(f: (value: V) => V): <K>(self: TMap<K, V>) => STM.STM<void>;
    <K, V>(self: TMap<K, V>, f: (value: V) => V): STM.STM<void>;
};
/**
 * Atomically updates all values using a transactional function.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const transformValuesSTM: {
    <V, R, E>(f: (value: V) => STM.STM<V, E, R>): <K>(self: TMap<K, V>) => STM.STM<void, E, R>;
    <K, V, R, E>(self: TMap<K, V>, f: (value: V) => STM.STM<V, E, R>): STM.STM<void, E, R>;
};
/**
 * Updates the mapping for the specified key with the specified function,
 * which takes the current value of the key as an input, if it exists, and
 * either returns `Some` with a new value to indicate to update the value in
 * the map or `None` to remove the value from the map. Returns `Some` with the
 * updated value or `None` if the value was removed from the map.
 *
 * @since 2.0.0
 * @category mutations
 */
export declare const updateWith: {
    <K, V>(key: K, f: (value: Option.Option<V>) => Option.Option<V>): (self: TMap<K, V>) => STM.STM<Option.Option<V>>;
    <K, V>(self: TMap<K, V>, key: K, f: (value: Option.Option<V>) => Option.Option<V>): STM.STM<Option.Option<V>>;
};
/**
 * Collects all values stored in map.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const values: <K, V>(self: TMap<K, V>) => STM.STM<Array<V>>;
//# sourceMappingURL=TMap.d.ts.map