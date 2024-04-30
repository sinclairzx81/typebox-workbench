import type * as HM from "../HashMap.js";
/**
 * Maps over the entries of the `HashMap` using the specified function.
 *
 * @since 2.0.0
 * @category mapping
 */
export declare const map: (<A, V, K>(f: (value: V, key: K) => A) => (self: HM.HashMap<K, V>) => HM.HashMap<K, A>) & (<K_1, V_1, A_1>(self: HM.HashMap<K_1, V_1>, f: (value: V_1, key: K_1) => A_1) => HM.HashMap<K_1, A_1>);
//# sourceMappingURL=hashMap.d.ts.map