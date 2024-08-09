"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Tuple = Tuple;
const type_1 = require("../create/type");
const index_1 = require("../symbols/index");
/** `[Json]` Creates a Tuple type */
function Tuple(items, options) {
    // prettier-ignore
    return (0, type_1.CreateType)(items.length > 0 ?
        { [index_1.Kind]: 'Tuple', type: 'array', items, additionalItems: false, minItems: items.length, maxItems: items.length } :
        { [index_1.Kind]: 'Tuple', type: 'array', minItems: items.length, maxItems: items.length }, options);
}
