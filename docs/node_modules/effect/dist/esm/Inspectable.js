/**
 * @since 2.0.0
 */
import { hasProperty, isFunction } from "./Predicate.js";
/**
 * @since 2.0.0
 * @category symbols
 */
export const NodeInspectSymbol = /*#__PURE__*/Symbol.for("nodejs.util.inspect.custom");
/**
 * @since 2.0.0
 */
export const toJSON = x => {
  if (hasProperty(x, "toJSON") && isFunction(x["toJSON"]) && x["toJSON"].length === 0) {
    return x.toJSON();
  } else if (Array.isArray(x)) {
    return x.map(toJSON);
  }
  return x;
};
/**
 * @since 2.0.0
 */
export const format = x => JSON.stringify(x, null, 2);
/**
 * @since 2.0.0
 */
export const BaseProto = {
  toJSON() {
    return toJSON(this);
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format(this.toJSON());
  }
};
/**
 * @since 2.0.0
 */
export class Class {
  /**
   * @since 2.0.0
   */
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  /**
   * @since 2.0.0
   */
  toString() {
    return format(this.toJSON());
  }
}
/**
 * @since 2.0.0
 */
export const toStringUnknown = (u, whitespace = 2) => {
  try {
    return typeof u === "object" ? stringifyCircular(u, whitespace) : String(u);
  } catch (_) {
    return String(u);
  }
};
/**
 * @since 2.0.0
 */
export const stringifyCircular = (obj, whitespace) => {
  let cache = [];
  const retVal = JSON.stringify(obj, (_key, value) => typeof value === "object" && value !== null ? cache.includes(value) ? undefined // circular reference
  : cache.push(value) && value : value, whitespace);
  cache = undefined;
  return retVal;
};
//# sourceMappingURL=Inspectable.js.map