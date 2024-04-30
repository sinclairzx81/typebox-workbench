import * as internal from "./internal/matcher.js";
import * as Predicate from "./Predicate.js";
/**
 * @category type ids
 * @since 1.0.0
 */
export const MatcherTypeId = internal.TypeId;
/**
 * @category constructors
 * @since 1.0.0
 */
export const type = internal.type;
/**
 * @category constructors
 * @since 1.0.0
 */
export const value = internal.value;
/**
 * @category constructors
 * @since 1.0.0
 */
export const valueTags = internal.valueTags;
/**
 * @category constructors
 * @since 1.0.0
 */
export const typeTags = internal.typeTags;
/**
 * @category combinators
 * @since 1.0.0
 */
export const withReturnType = internal.withReturnType;
/**
 * @category combinators
 * @since 1.0.0
 */
export const when = internal.when;
/**
 * @category combinators
 * @since 1.0.0
 */
export const whenOr = internal.whenOr;
/**
 * @category combinators
 * @since 1.0.0
 */
export const whenAnd = internal.whenAnd;
/**
 * @category combinators
 * @since 1.0.0
 */
export const discriminator = internal.discriminator;
/**
 * @category combinators
 * @since 1.0.0
 */
export const discriminatorStartsWith = internal.discriminatorStartsWith;
/**
 * @category combinators
 * @since 1.0.0
 */
export const discriminators = internal.discriminators;
/**
 * @category combinators
 * @since 1.0.0
 */
export const discriminatorsExhaustive = internal.discriminatorsExhaustive;
/**
 * @category combinators
 * @since 1.0.0
 */
export const tag = internal.tag;
/**
 * @category combinators
 * @since 1.0.0
 */
export const tagStartsWith = internal.tagStartsWith;
/**
 * @category combinators
 * @since 1.0.0
 */
export const tags = internal.tags;
/**
 * @category combinators
 * @since 1.0.0
 */
export const tagsExhaustive = internal.tagsExhaustive;
/**
 * @category combinators
 * @since 1.0.0
 */
export const not = internal.not;
/**
 * @category predicates
 * @since 1.0.0
 */
export const nonEmptyString = internal.nonEmptyString;
/**
 * @category predicates
 * @since 1.0.0
 */
export const is = internal.is;
/**
 * @category predicates
 * @since 1.0.0
 */
export const string = Predicate.isString;
/**
 * @category predicates
 * @since 1.0.0
 */
export const number = Predicate.isNumber;
/**
 * @category predicates
 * @since 1.0.0
 */
export const any = internal.any;
/**
 * @category predicates
 * @since 1.0.0
 */
export const defined = internal.defined;
/**
 * @category predicates
 * @since 1.0.0
 */
export const boolean = Predicate.isBoolean;
const _undefined = Predicate.isUndefined;
export {
/**
 * @category predicates
 * @since 1.0.0
 */
_undefined as undefined };
const _null = Predicate.isNull;
export {
/**
 * @category predicates
 * @since 1.0.0
 */
_null as null };
/**
 * @category predicates
 * @since 1.0.0
 */
export const bigint = Predicate.isBigInt;
/**
 * @category predicates
 * @since 1.0.0
 */
export const symbol = Predicate.isSymbol;
/**
 * @category predicates
 * @since 1.0.0
 */
export const date = Predicate.isDate;
/**
 * @category predicates
 * @since 1.0.0
 */
export const record = Predicate.isRecord;
/**
 * @category predicates
 * @since 1.0.0
 */
export const instanceOf = internal.instanceOf;
/**
 * @category predicates
 * @since 1.0.0
 */
export const instanceOfUnsafe = internal.instanceOf;
/**
 * @category conversions
 * @since 1.0.0
 */
export const orElse = internal.orElse;
/**
 * @category conversions
 * @since 1.0.0
 */
export const orElseAbsurd = internal.orElseAbsurd;
/**
 * @category conversions
 * @since 1.0.0
 */
export const either = internal.either;
/**
 * @category conversions
 * @since 1.0.0
 */
export const option = internal.option;
/**
 * @category conversions
 * @since 1.0.0
 */
export const exhaustive = internal.exhaustive;
/**
 * @since 1.0.0
 * @category type ids
 */
export const SafeRefinementId = /*#__PURE__*/Symbol.for("effect/SafeRefinement");
const Fail = /*#__PURE__*/Symbol.for("effect/Fail");
//# sourceMappingURL=Match.js.map