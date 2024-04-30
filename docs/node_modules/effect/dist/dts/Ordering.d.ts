/**
 * @since 2.0.0
 */
import type { LazyArg } from "./Function.js";
/**
 * @category model
 * @since 2.0.0
 */
export type Ordering = -1 | 0 | 1;
/**
 * Inverts the ordering of the input `Ordering`.
 *
 * @param o - The input `Ordering`.
 *
 * @example
 * import { reverse } from "effect/Ordering"
 *
 * assert.deepStrictEqual(reverse(1), -1)
 * assert.deepStrictEqual(reverse(-1), 1)
 * assert.deepStrictEqual(reverse(0), 0)
 *
 * @since 2.0.0
 */
export declare const reverse: (o: Ordering) => Ordering;
/**
 * Depending on the `Ordering` parameter given to it, returns a value produced by one of the 3 functions provided as parameters.
 *
 * @param self - The `Ordering` parameter to match against.
 * @param onLessThan - A function that will be called if the `Ordering` parameter is `-1`.
 * @param onEqual - A function that will be called if the `Ordering` parameter is `0`.
 * @param onGreaterThan - A function that will be called if the `Ordering` parameter is `1`.
 *
 * @example
 * import { match } from "effect/Ordering"
 * import { constant } from "effect/Function"
 *
 * const toMessage = match({
 *   onLessThan: constant('less than'),
 *   onEqual: constant('equal'),
 *   onGreaterThan: constant('greater than')
 * })
 *
 * assert.deepStrictEqual(toMessage(-1), "less than")
 * assert.deepStrictEqual(toMessage(0), "equal")
 * assert.deepStrictEqual(toMessage(1), "greater than")
 *
 * @category pattern matching
 * @since 2.0.0
 */
export declare const match: {
    <A, B, C = B>(options: {
        readonly onLessThan: LazyArg<A>;
        readonly onEqual: LazyArg<B>;
        readonly onGreaterThan: LazyArg<C>;
    }): (self: Ordering) => A | B | C;
    <A, B, C = B>(o: Ordering, options: {
        readonly onLessThan: LazyArg<A>;
        readonly onEqual: LazyArg<B>;
        readonly onGreaterThan: LazyArg<C>;
    }): A | B | C;
};
/**
 * @category combining
 * @since 2.0.0
 */
export declare const combine: {
    (that: Ordering): (self: Ordering) => Ordering;
    (self: Ordering, that: Ordering): Ordering;
};
/**
 * @category combining
 * @since 2.0.0
 */
export declare const combineMany: {
    (collection: Iterable<Ordering>): (self: Ordering) => Ordering;
    (self: Ordering, collection: Iterable<Ordering>): Ordering;
};
/**
 * @category combining
 * @since 2.0.0
 */
export declare const combineAll: (collection: Iterable<Ordering>) => Ordering;
//# sourceMappingURL=Ordering.d.ts.map