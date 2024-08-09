"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceType = InstanceType;
const type_1 = require("../create/type");
/** `[JavaScript]` Extracts the InstanceType from the given Constructor type */
function InstanceType(schema, options) {
    return (0, type_1.CreateType)(schema.returns, options);
}
