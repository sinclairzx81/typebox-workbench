/** @internal */
export const make = (label, startTime) => ({
  label,
  startTime
});
/** @internal */
export const render = now => self => {
  const label = self.label.replace(/[\s="]/g, "_");
  return `${label}=${now - self.startTime}ms`;
};
//# sourceMappingURL=logSpan.js.map