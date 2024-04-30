import { dual, pipe } from "./Function.js";
import * as core from "./internal/core.js";
import * as number from "./Number.js";
import * as order from "./Order.js";
/**
 * @since 2.0.0
 * @category constructors
 */
export const All = core.logLevelAll;
/**
 * @since 2.0.0
 * @category constructors
 */
export const Fatal = core.logLevelFatal;
/**
 * @since 2.0.0
 * @category constructors
 */
export const Error = core.logLevelError;
/**
 * @since 2.0.0
 * @category constructors
 */
export const Warning = core.logLevelWarning;
/**
 * @since 2.0.0
 * @category constructors
 */
export const Info = core.logLevelInfo;
/**
 * @since 2.0.0
 * @category constructors
 */
export const Debug = core.logLevelDebug;
/**
 * @since 2.0.0
 * @category constructors
 */
export const Trace = core.logLevelTrace;
/**
 * @since 2.0.0
 * @category constructors
 */
export const None = core.logLevelNone;
/**
 * @since 2.0.0
 * @category constructors
 */
export const allLevels = core.allLogLevels;
/**
 * Locally applies the specified `LogLevel` to an `Effect` workflow, reverting
 * to the previous `LogLevel` after the `Effect` workflow completes.
 *
 * @since 2.0.0
 * @category utils
 */
export const locally = /*#__PURE__*/dual(2, (use, self) => core.fiberRefLocally(use, core.currentLogLevel, self));
/**
 * @since 2.0.0
 * @category instances
 */
export const Order = /*#__PURE__*/pipe(number.Order, /*#__PURE__*/order.mapInput(level => level.ordinal));
/**
 * @since 2.0.0
 * @category ordering
 */
export const lessThan = /*#__PURE__*/order.lessThan(Order);
/**
 * @since 2.0.0
 * @category ordering
 */
export const lessThanEqual = /*#__PURE__*/order.lessThanOrEqualTo(Order);
/**
 * @since 2.0.0
 * @category ordering
 */
export const greaterThan = /*#__PURE__*/order.greaterThan(Order);
/**
 * @since 2.0.0
 * @category ordering
 */
export const greaterThanEqual = /*#__PURE__*/order.greaterThanOrEqualTo(Order);
/**
 * @since 2.0.0
 * @category conversions
 */
export const fromLiteral = literal => {
  switch (literal) {
    case "All":
      return All;
    case "Debug":
      return Debug;
    case "Error":
      return Error;
    case "Fatal":
      return Fatal;
    case "Info":
      return Info;
    case "Trace":
      return Trace;
    case "None":
      return None;
    case "Warning":
      return Warning;
  }
};
//# sourceMappingURL=LogLevel.js.map