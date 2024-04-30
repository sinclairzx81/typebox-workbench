import * as Cause from "../Cause.js";
import { dual } from "../Function.js";
import * as HashMap from "../HashMap.js";
import * as List from "../List.js";
import * as core from "./core.js";
import * as _fiberId from "./fiberId.js";
import * as fiberRefs from "./fiberRefs.js";
/** @internal */
export const test = /*#__PURE__*/dual(2, (self, input) => self.log({
  fiberId: _fiberId.none,
  logLevel: core.logLevelInfo,
  message: input,
  cause: Cause.empty,
  context: fiberRefs.empty(),
  spans: List.empty(),
  annotations: HashMap.empty(),
  date: new Date()
}));
//# sourceMappingURL=logger-circular.js.map