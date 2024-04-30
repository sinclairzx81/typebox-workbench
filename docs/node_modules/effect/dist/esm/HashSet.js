/**
 * @since 2.0.0
 */
import * as HS from "./internal/hashSet.js";
const TypeId = HS.HashSetTypeId;
/**
 * @since 2.0.0
 * @category refinements
 */
export const isHashSet = HS.isHashSet;
/**
 * Creates an empty `HashSet`.
 *
 * @since 2.0.0
 * @category constructors
 */
export const empty = HS.empty;
/**
 * Creates a new `HashSet` from an iterable collection of values.
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromIterable = HS.fromIterable;
/**
 * Construct a new `HashSet` from a variable number of values.
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = HS.make;
/**
 * Checks if the specified value exists in the `HashSet`.
 *
 * @since 2.0.0
 * @category elements
 */
export const has = HS.has;
/**
 * Check if a predicate holds true for some `HashSet` element.
 *
 * @since 2.0.0
 * @category elements
 */
export const some = HS.some;
/**
 * Check if a predicate holds true for every `HashSet` element.
 *
 * @since 2.0.0
 * @category elements
 */
export const every = HS.every;
/**
 * Returns `true` if and only if every element in the this `HashSet` is an
 * element of the second set,
 *
 * **NOTE**: the hash and equal of both sets must be the same.
 *
 * @since 2.0.0
 * @category elements
 */
export const isSubset = HS.isSubset;
/**
 * Returns an `IterableIterator` of the values in the `HashSet`.
 *
 * @since 2.0.0
 * @category getters
 */
export const values = HS.values;
/**
 * Calculates the number of values in the `HashSet`.
 *
 * @since 2.0.0
 * @category getters
 */
export const size = HS.size;
/**
 * Marks the `HashSet` as mutable.
 *
 * @since 2.0.0
 */
export const beginMutation = HS.beginMutation;
/**
 * Marks the `HashSet` as immutable.
 *
 * @since 2.0.0
 */
export const endMutation = HS.endMutation;
/**
 * Mutates the `HashSet` within the context of the provided function.
 *
 * @since 2.0.0
 */
export const mutate = HS.mutate;
/**
 * Adds a value to the `HashSet`.
 *
 * @since 2.0.0
 */
export const add = HS.add;
/**
 * Removes a value from the `HashSet`.
 *
 * @since 2.0.0
 */
export const remove = HS.remove;
/**
 * Computes the set difference between this `HashSet` and the specified
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 2.0.0
 */
export const difference = HS.difference;
/**
 * Returns a `HashSet` of values which are present in both this set and that
 * `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 2.0.0
 */
export const intersection = HS.intersection;
/**
 * Computes the set union `(`self` + `that`)` between this `HashSet` and the
 * specified `Iterable<A>`.
 *
 * **NOTE**: the hash and equal of the values in both the set and the iterable
 * must be the same.
 *
 * @since 2.0.0
 */
export const union = HS.union;
/**
 * Checks if a value is present in the `HashSet`. If it is present, the value
 * will be removed from the `HashSet`, otherwise the value will be added to the
 * `HashSet`.
 *
 * @since 2.0.0
 */
export const toggle = HS.toggle;
/**
 * Maps over the values of the `HashSet` using the specified function.
 *
 * @since 2.0.0
 * @category mapping
 */
export const map = HS.map;
/**
 * Chains over the values of the `HashSet` using the specified function.
 *
 * @since 2.0.0
 * @category sequencing
 */
export const flatMap = HS.flatMap;
/**
 * Applies the specified function to the values of the `HashSet`.
 *
 * @since 2.0.0
 * @category traversing
 */
export const forEach = HS.forEach;
/**
 * Reduces the specified state over the values of the `HashSet`.
 *
 * @since 2.0.0
 * @category folding
 */
export const reduce = HS.reduce;
/**
 * Filters values out of a `HashSet` using the specified predicate.
 *
 * @since 2.0.0
 * @category filtering
 */
export const filter = HS.filter;
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
export const partition = HS.partition;
//# sourceMappingURL=HashSet.js.map