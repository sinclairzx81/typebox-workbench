"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructorParameters = ConstructorParameters;
const index_1 = require("../tuple/index");
/** `[JavaScript]` Extracts the ConstructorParameters from the given Constructor type */
function ConstructorParameters(schema, options) {
    return (0, index_1.Tuple)(schema.parameters, options);
}
