"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnType = ReturnType;
const type_1 = require("../create/type");
/** `[JavaScript]` Extracts the ReturnType from the given Function type */
function ReturnType(schema, options) {
    return (0, type_1.CreateType)(schema.returns, options);
}
