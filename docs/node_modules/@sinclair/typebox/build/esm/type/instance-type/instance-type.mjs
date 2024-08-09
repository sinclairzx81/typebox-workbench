import { CreateType } from '../create/type.mjs';
/** `[JavaScript]` Extracts the InstanceType from the given Constructor type */
export function InstanceType(schema, options) {
    return CreateType(schema.returns, options);
}
