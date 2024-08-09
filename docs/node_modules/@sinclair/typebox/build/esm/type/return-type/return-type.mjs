import { CreateType } from '../create/type.mjs';
/** `[JavaScript]` Extracts the ReturnType from the given Function type */
export function ReturnType(schema, options) {
    return CreateType(schema.returns, options);
}
