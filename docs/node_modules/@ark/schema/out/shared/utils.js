import { flatMorph, isArray, isDotAccessible, noSuggest, printable, throwParseError } from "@ark/util";
export const makeRootAndArrayPropertiesMutable = (o) => 
// this cast should not be required, but it seems TS is referencing
// the wrong parameters here?
flatMorph(o, (k, v) => [k, isArray(v) ? [...v] : v]);
export const pathToPropString = (path, ...[opts]) => {
    const stringifySymbol = opts?.stringifySymbol ?? printable;
    const propAccessChain = path.reduce((s, k) => {
        switch (typeof k) {
            case "string":
                return isDotAccessible(k) ? `${s}.${k}` : `${s}[${JSON.stringify(k)}]`;
            case "number":
                return `${s}[${k}]`;
            case "symbol":
                return `${s}[${stringifySymbol(k)}]`;
            default:
                if (opts?.stringifyNonKey)
                    return `${s}[${opts.stringifyNonKey(k)}]`;
                throwParseError(`${printable(k)} must be a PropertyKey or stringifyNonKey must be passed to options`);
        }
    }, "");
    return propAccessChain[0] === "." ? propAccessChain.slice(1) : propAccessChain;
};
export const arkKind = noSuggest("arkKind");
export const hasArkKind = (value, kind) => value?.[arkKind] === kind;
export const isNode = (value) => hasArkKind(value, "root") || hasArkKind(value, "constraint");
