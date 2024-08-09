import { MappedResult } from '../mapped/index.mjs';
import { Omit } from './omit.mjs';
import { Clone } from '../clone/value.mjs';
// prettier-ignore
function FromProperties(P, K, options) {
    const Acc = {};
    for (const K2 of globalThis.Object.getOwnPropertyNames(P))
        Acc[K2] = Omit(P[K2], K, Clone(options));
    return Acc;
}
// prettier-ignore
function FromMappedResult(R, K, options) {
    return FromProperties(R.properties, K, options);
}
// prettier-ignore
export function OmitFromMappedResult(R, K, options) {
    const P = FromMappedResult(R, K, options);
    return MappedResult(P);
}
