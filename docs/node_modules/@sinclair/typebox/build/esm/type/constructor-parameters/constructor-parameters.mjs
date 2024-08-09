import { Tuple } from '../tuple/index.mjs';
/** `[JavaScript]` Extracts the ConstructorParameters from the given Constructor type */
export function ConstructorParameters(schema, options) {
    return Tuple(schema.parameters, options);
}
