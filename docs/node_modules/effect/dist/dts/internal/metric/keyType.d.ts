import * as Duration from "../../Duration.js";
import * as Equal from "../../Equal.js";
import * as Hash from "../../Hash.js";
import type * as MetricBoundaries from "../../MetricBoundaries.js";
import type * as MetricKeyType from "../../MetricKeyType.js";
/**
 * @category model
 * @since 2.0.0
 */
export declare class HistogramKeyType implements MetricKeyType.MetricKeyType.Histogram {
    readonly boundaries: MetricBoundaries.MetricBoundaries;
    readonly [MetricKeyTypeTypeId]: {
        _In: (_: unknown) => unknown;
        _Out: (_: never) => never;
    };
    readonly [HistogramKeyTypeTypeId]: MetricKeyType.HistogramKeyTypeTypeId;
    constructor(boundaries: MetricBoundaries.MetricBoundaries);
    readonly _hash: number;
    [Hash.symbol](): number;
    [Equal.symbol](that: unknown): boolean;
    pipe(): unknown;
}
/**
 * @since 2.0.0
 * @category constructors
 */
export declare const counter: <A extends number | bigint>(options?: {
    readonly bigint: boolean;
    readonly incremental: boolean;
}) => CounterKeyType<A>;
/**
 * @since 2.0.0
 * @category constructors
 */
export declare const frequency: (options?: {
    readonly preregisteredWords?: ReadonlyArray<string> | undefined;
}) => MetricKeyType.MetricKeyType.Frequency;
/**
 * @since 2.0.0
 * @category constructors
 */
export declare const gauge: <A extends number | bigint>(options?: {
    readonly bigint: boolean;
}) => GaugeKeyType<A>;
/**
 * @since 2.0.0
 * @category constructors
 */
export declare const histogram: (boundaries: MetricBoundaries.MetricBoundaries) => MetricKeyType.MetricKeyType.Histogram;
/**
 * @since 2.0.0
 * @category constructors
 */
export declare const summary: (options: {
    readonly maxAge: Duration.DurationInput;
    readonly maxSize: number;
    readonly error: number;
    readonly quantiles: ReadonlyArray<number>;
}) => MetricKeyType.MetricKeyType.Summary;
/**
 * @since 2.0.0
 * @category refinements
 */
export declare const isMetricKeyType: (u: unknown) => u is MetricKeyType.MetricKeyType<unknown, unknown>;
/**
 * @since 2.0.0
 * @category refinements
 */
export declare const isCounterKey: (u: unknown) => u is MetricKeyType.MetricKeyType.Counter<number | bigint>;
/**
 * @since 2.0.0
 * @category refinements
 */
export declare const isFrequencyKey: (u: unknown) => u is MetricKeyType.MetricKeyType.Frequency;
/**
 * @since 2.0.0
 * @category refinements
 */
export declare const isGaugeKey: (u: unknown) => u is MetricKeyType.MetricKeyType.Gauge<number | bigint>;
/**
 * @since 2.0.0
 * @category refinements
 */
export declare const isHistogramKey: (u: unknown) => u is MetricKeyType.MetricKeyType.Histogram;
/**
 * @since 2.0.0
 * @category refinements
 */
export declare const isSummaryKey: (u: unknown) => u is MetricKeyType.MetricKeyType.Summary;
//# sourceMappingURL=keyType.d.ts.map