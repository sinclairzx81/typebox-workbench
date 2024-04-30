/**
 * @since 2.0.0
 */
import type { Equal } from "./Equal.js";
import type { Inspectable } from "./Inspectable.js";
import type { Pipeable } from "./Pipeable.js";
import type { Predicate, Refinement } from "./Predicate.js";
import type { NoInfer } from "./Types.js";
declare const TypeId: unique symbol;
/**
 * @since 2.0.0
 * @category symbol
 */
export type TypeId = typeof TypeId;
/**
 * @since 2.0.0
 * @category models
 */
export interface HashSet<out A> extends Iterable<A>, Equal, Pipeable, Inspectable {
    readonly [TypeId]: TypeId;
}
/**
 * @since 2.0.0
 * @category refinements
 */
export declare const isHashSet: {
    <A>(u: Iterable<A>): u is HashSet<A>;
    (u: unknown): u is HashSet<unknown>;
};
/**
 * Creates an empty `HashSet`.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const empty: <A = never>() => HashSet<A>;
/**
 * Creates a new `HashSet` from an iterable collection of values.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const fromIterable: <A>(elements: Iterable<A>) => HashSet<A>;
/**
 * Construct a new `HashSet` from a variable number of values.
 *
 * @since 2.0.0
 * @category constructors
 */
export declare const make: <As extends ReadonlyArray<any>>(...elements: As) => HashSet<As[number]>;
/**
 * Checks if the specified value exists in the `HashSet`.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const has: {
    <A>(value: A): (self: HashSet<A>) => boolean;
    <A>(self: HashSet<A>, value: A): boolean;
};
/**
 * Check if a predicate holds true for some `HashSet` element.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const some: {
    <A>(f: Predicate<A>): (self: HashSet<A>) => boolean;
    <A>(self: HashSet<A>, f: Predicate<A>): boolean;
};
/**
 * Check if a predicate holds true for every `HashSet` element.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const every: {
    <A, B extends A>(refinement: Refinement<NoInfer<A>, B>): (self: HashSet<A>) => self is HashSet<B>;
    <A>(predicate: Predicate<A>): (self: HashSet<A>) => boolean;
    <A, B extends A>(self: HashSet<A>, refinement: Refinement<A, B>): self is HashSet<B>;
    <A>(self: HashSet<A>, predicate: Predicate<A>): boolean;
};
/**
 * Returns `true` if and only if every element in the this `HashSet` is an
 * element of the second set,
 *
 * **NOTE**: the hash and equal of both sets must be the same.
 *
 * @since 2.0.0
 * @category elements
 */
export declare const isSubset: {
    <A>(that: HashSet<A>): (self: HashSet<A>) => boolean;
    <A>(self: HashSet<A>, that: HashSet<A>): boolean;
};
/**
 * Returns an `IterableIterator` of the values in the `HashSet`.
 *
 * @since 2.0.0
 * @category getters
 */
export declare const values: <A>(self: HashSet<A>) => IterableIterator<A>;
/**
 * Calculates the number of values in the `HashSet`.
 *
 * @since 2.0.0
 * @category getters
 */
export declare const size: <A>(self: HashSet<A>) => number;
/**
 * Marks the `HashSet` as mutable.
 *
 * @since 2.0.0
 */
export declare const beginMutation: <A>(self: HashSet<A>) => HashSet<A>;
/**
 * Marks the `HashSet` as immutable.
 *
 * @since 2.0.0
 */
export declare const endMutation: <A>(self: HashSet<A>) => HashSet<A>;
/**
 * Mutates the `HashSet` within the context of the provided function.
 *
 * @since 2.0.0
 */
export declare const mutate: {
    <A>(f: (set: HashSet<A>) => void): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, f: (set: HashSet<A>) => void): HashSet<A>;
};
/**
 * Adds a value to the `HashSet`.
 *
 * @since 2.0.0
 */
export declare const add: {
    <A>(value: A): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, value: A): HashSet<A>;
};
/**
 * Removes a value from the `HashSet`.
 *
 * @since 2.0.0
 */
export declare const remove: {
    <A>(value: A): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, value: A): HashSet<A>;
};
/**
 * Computes the set difference between this `HashSet` and the specified
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 2.0.0
 */
export declare const difference: {
    <A>(that: Iterable<A>): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, that: Iterable<A>): HashSet<A>;
};
/**
 * Returns a `HashSet` of values which are present in both this set and that
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 2.0.0
 */
export declare const intersection: {
    <A>(that: Iterable<A>): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, that: Iterable<A>): HashSet<A>;
};
/**
 * Computes the set union `(`self` + `that`)` between this `HashSet` and the
 * specified `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 2.0.0
 */
export declare const union: {
    <A>(that: Iterable<A>): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, that: Iterable<A>): HashSet<A>;
};
/**
 * Checks if a value is present in the `HashSet`. If it is present, the value
 * will be removed from the `HashSet`, otherwise the value will be added to the
 * `HashSet`.
 *
 * @since 2.0.0
 */
export declare const toggle: {
    <A>(value: A): (self: HashSet<A>) => HashSet<A>;
    <A>(self: HashSet<A>, value: A): HashSet<A>;
};
/**
 * Maps over the values of the `HashSet` using the specified function.
 *
 * @since 2.0.0
 * @category mapping
 */
export declare const map: {
    <A, B>(f: (a: A) => B): (self: HashSet<A>) => HashSet<B>;
    <A, B>(self: HashSet<A>, f: (a: A) => B): HashSet<B>;
};
/**
 * Chains over the values of the `HashSet` using the specified function.
 *
 * @since 2.0.0
 * @category sequencing
 */
export declare const flatMap: {
    <A, B>(f: (a: A) => Iterable<B>): (self: HashSet<A>) => HashSet<B>;
    <A, B>(self: HashSet<A>, f: (a: A) => Iterable<B>): HashSet<B>;
};
/**
 * Applies the specified function to the values of the `HashSet`.
 *
 * @since 2.0.0
 * @category traversing
 */
export declare const forEach: {
    <A>(f: (value: A) => void): (self: HashSet<A>) => void;
    <A>(self: HashSet<A>, f: (value: A) => void): void;
};
/**
 * Reduces the specified state over the values of the `HashSet`.
 *
 * @since 2.0.0
 * @category folding
 */
export declare const reduce: {
    <A, Z>(zero: Z, f: (accumulator: Z, value: A) => Z): (self: HashSet<A>) => Z;
    <A, Z>(self: HashSet<A>, zero: Z, f: (accumulator: Z, value: A) => Z): Z;
};
/**
 * Filters values out of a `HashSet` using the specified predicate.
 *
 * @since 2.0.0
 * @category filtering
 */
export declare const filter: {
    <A, B extends A>(refinement: Refinement<NoInfer<A>, B>): (self: HashSet<A>) => HashSet<B>;
    <A>(predicate: Predicate<NoInfer<A>>): (self: HashSet<A>) => HashSet<A>;
    <A, B extends A>(self: HashSet<A>, refinement: Refinement<A, B>): HashSet<B>;
    <A>(self: HashSet<A>, predicate: Predicate<A>): HashSet<A>;
};
/**
 * Partition the values of a `HashSet` using the specified predicate.
 *
 * If a value matches the predicate, it will be placed into the `HashSet` on the
 * right side of the resulting `Tuple`, otherwise the value will be placed into
 * the left side.
 *
 * @since 2.0.0
 * @category partitioning
 */
export declare const partition: {
    <A, B extends A>(refinement: Refinement<NoInfer<A>, B>): (self: HashSet<A>) => [excluded: HashSet<Exclude<A, B>>, satisfying: HashSet<B>];
    <A>(predicate: Predicate<NoInfer<A>>): (self: HashSet<A>) => [excluded: HashSet<A>, satisfying: HashSet<A>];
    <A, B extends A>(self: HashSet<A>, refinement: Refinement<A, B>): [excluded: HashSet<Exclude<A, B>>, satisfying: HashSet<B>];
    <A>(self: HashSet<A>, predicate: Predicate<A>): [excluded: HashSet<A>, satisfying: HashSet<A>];
};
export {};
//# sourceMappingURL=HashSet.d.ts.map