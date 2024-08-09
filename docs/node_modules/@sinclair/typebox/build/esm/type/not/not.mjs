import { CreateType } from '../create/type.mjs';
import { Kind } from '../symbols/index.mjs';
/** `[Json]` Creates a Not type */
export function Not(not, options) {
    return CreateType({ [Kind]: 'Not', not }, options);
}
