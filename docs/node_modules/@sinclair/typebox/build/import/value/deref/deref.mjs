import { TypeBoxError } from '../../type/error/index.mjs';
export class TypeDereferenceError extends TypeBoxError {
    schema;
    constructor(schema) {
        super(`Unable to dereference schema with $id '${schema.$id}'`);
        this.schema = schema;
    }
}
/** Dereferences a schema from the references array or throws if not found */
export function Deref(schema, references) {
    const index = references.findIndex((target) => target.$id === schema.$ref);
    if (index === -1)
        throw new TypeDereferenceError(schema);
    return references[index];
}
