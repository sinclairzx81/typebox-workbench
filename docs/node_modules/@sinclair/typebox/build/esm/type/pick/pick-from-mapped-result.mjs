import { MappedResult } from '../mapped/index.mjs';
import { Pick } from './pick.mjs';
import { Clone } from '../clone/value.mjs';
// prettier-ignore
function FromProperties(P, K, options) {
    const Acc = {};
    for (const K2 of globalThis.Object.getOwnPropertyNames(P))
        Acc[K2] = Pick(P[K2], K, Clone(options));
    return Acc;
}
// prettier-ignore
function FromMappedResult(R, K, options) {
    return FromProperties(R.properties, K, options);
}
// prettier-ignore
export function PickFromMappedResult(R, K, options) {
    const P = FromMappedResult(R, K, options);
    return MappedResult(P);
}
