import { append, printable, throwParseError, unset } from "@ark/util";
import { BaseConstraint } from "../constraint.js";
import { flatRef } from "../node.js";
import { compileSerializedValue } from "../shared/compile.js";
import { Disjoint } from "../shared/disjoint.js";
import { intersectNodes } from "../shared/intersections.js";
import { $ark, registeredReference } from "../shared/registry.js";
export const intersectProps = (l, r, ctx) => {
    if (l.key !== r.key)
        return null;
    const key = l.key;
    let value = intersectNodes(l.value, r.value, ctx);
    const kind = l.required || r.required ? "required" : "optional";
    if (value instanceof Disjoint) {
        if (kind === "optional")
            value = $ark.intrinsic.never.internal;
        else {
            // if either operand was optional, the Disjoint has to be treated as optional
            return value.withPrefixKey(l.key, l.required && r.required ? "required" : "optional");
        }
    }
    if (kind === "required") {
        return ctx.$.node("required", {
            key,
            value
        });
    }
    const defaultIntersection = l.hasDefault() ?
        r.hasDefault() ?
            l.default === r.default ?
                l.default
                : throwParseError(`Invalid intersection of default values ${printable(l.default)} & ${printable(r.default)}`)
            : l.default
        : r.hasDefault() ? r.default
            : unset;
    return ctx.$.node("optional", {
        key,
        value,
        // unset is stripped during parsing
        default: defaultIntersection
    });
};
export class BaseProp extends BaseConstraint {
    required = this.kind === "required";
    optional = this.kind === "optional";
    impliedBasis = $ark.intrinsic.object.internal;
    serializedKey = compileSerializedValue(this.key);
    compiledKey = typeof this.key === "string" ? this.key : this.serializedKey;
    get flatRefs() {
        return append(this.value.flatRefs.map(ref => flatRef([this.key, ...ref.path], ref.node)), flatRef([this.key], this.value));
    }
    _transform(mapper, ctx) {
        ctx.path.push(this.key);
        const result = super._transform(mapper, ctx);
        ctx.path.pop();
        return result;
    }
    defaultValueMorphs = [
        data => {
            data[this.key] = this.default;
            return data;
        }
    ];
    defaultValueMorphsReference = registeredReference(this.defaultValueMorphs);
    hasDefault() {
        return "default" in this;
    }
    traverseAllows = (data, ctx) => {
        if (this.key in data) {
            // ctx will be undefined if this node isn't context-dependent
            ctx?.path.push(this.key);
            const allowed = this.value.traverseAllows(data[this.key], ctx);
            ctx?.path.pop();
            return allowed;
        }
        return this.optional;
    };
    traverseApply = (data, ctx) => {
        if (this.key in data) {
            ctx.path.push(this.key);
            this.value.traverseApply(data[this.key], ctx);
            ctx.path.pop();
        }
        else if (this.hasKind("required"))
            ctx.error(this.errorContext);
        else if (this.hasKind("optional") && this.hasDefault())
            ctx.queueMorphs(this.defaultValueMorphs);
    };
    compile(js) {
        js.if(`${this.serializedKey} in data`, () => js.traverseKey(this.serializedKey, `data${js.prop(this.key)}`, this.value));
        if (this.hasKind("required")) {
            js.else(() => {
                if (js.traversalKind === "Apply")
                    return js.line(`ctx.error(${this.compiledErrorContext})`);
                else
                    return js.return(false);
            });
        }
        else if (js.traversalKind === "Apply" && "default" in this) {
            js.else(() => js.line(`ctx.queueMorphs(${this.defaultValueMorphsReference})`));
        }
        if (js.traversalKind === "Allows")
            js.return(true);
    }
}
