"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PickFromMappedResult = PickFromMappedResult;
const index_1 = require("../mapped/index");
const pick_1 = require("./pick");
const value_1 = require("../clone/value");
// prettier-ignore
function FromProperties(P, K, options) {
    const Acc = {};
    for (const K2 of globalThis.Object.getOwnPropertyNames(P))
        Acc[K2] = (0, pick_1.Pick)(P[K2], K, (0, value_1.Clone)(options));
    return Acc;
}
// prettier-ignore
function FromMappedResult(R, K, options) {
    return FromProperties(R.properties, K, options);
}
// prettier-ignore
function PickFromMappedResult(R, K, options) {
    const P = FromMappedResult(R, K, options);
    return (0, index_1.MappedResult)(P);
}
