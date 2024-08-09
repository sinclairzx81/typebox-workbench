import { CreateType } from '../create/type.mjs';
import { Kind } from '../symbols/index.mjs';
/** `[Json]` Creates a Tuple type */
export function Tuple(items, options) {
    // prettier-ignore
    return CreateType(items.length > 0 ?
        { [Kind]: 'Tuple', type: 'array', items, additionalItems: false, minItems: items.length, maxItems: items.length } :
        { [Kind]: 'Tuple', type: 'array', minItems: items.length, maxItems: items.length }, options);
}
