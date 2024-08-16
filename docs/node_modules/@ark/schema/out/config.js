import { isNodeKind } from "./shared/implement.js";
import { $ark } from "./shared/registry.js";
$ark.config = {};
export const configure = (config) => Object.assign($ark.config, mergeConfigs($ark.config, config));
export const mergeConfigs = (base, extensions) => {
    const result = { ...base };
    let k;
    for (k in extensions) {
        result[k] =
            isNodeKind(k) ?
                {
                    ...base[k],
                    ...extensions[k]
                }
                : extensions[k];
    }
    return result;
};
export const extendConfig = (base, extension) => {
    if (!extension)
        return base;
    const result = mergeConfigs(base, extension);
    return result;
};
export const resolveConfig = (config) => extendConfig(extendConfig($ark.defaultConfig, $ark.config), config);
