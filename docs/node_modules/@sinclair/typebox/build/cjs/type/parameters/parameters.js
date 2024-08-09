"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = Parameters;
const index_1 = require("../tuple/index");
/** `[JavaScript]` Extracts the Parameters from the given Function type */
function Parameters(schema, options) {
    return (0, index_1.Tuple)(schema.parameters, options);
}
