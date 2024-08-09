import { Tuple } from '../tuple/index.mjs';
/** `[JavaScript]` Extracts the Parameters from the given Function type */
export function Parameters(schema, options) {
    return Tuple(schema.parameters, options);
}
