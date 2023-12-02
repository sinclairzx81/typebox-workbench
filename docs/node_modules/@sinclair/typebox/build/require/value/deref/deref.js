"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Deref = exports.TypeDereferenceError = void 0;
const index_1 = require("../../type/error/index");
class TypeDereferenceError extends index_1.TypeBoxError {
    constructor(schema) {
        super(`Unable to dereference schema with $id '${schema.$id}'`);
        this.schema = schema;
    }
}
exports.TypeDereferenceError = TypeDereferenceError;
/** Dereferences a schema from the references array or throws if not found */
function Deref(schema, references) {
    const index = references.findIndex((target) => target.$id === schema.$ref);
    if (index === -1)
        throw new TypeDereferenceError(schema);
    return references[index];
}
exports.Deref = Deref;
