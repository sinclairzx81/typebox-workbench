import { CreateType } from '../create/type.mjs';
import { Kind } from '../symbols/index.mjs';
// ------------------------------------------------------------------
// ValueGuard
// ------------------------------------------------------------------
import { IsString, IsUndefined } from '../guard/value.mjs';
/** `[Json]` Creates a Ref type. */
export function Ref(unresolved, options) {
    if (IsString(unresolved))
        return CreateType({ [Kind]: 'Ref', $ref: unresolved }, options);
    if (IsUndefined(unresolved.$id))
        throw new Error('Reference target type must specify an $id');
    return CreateType({ [Kind]: 'Ref', $ref: unresolved.$id }, options);
}
