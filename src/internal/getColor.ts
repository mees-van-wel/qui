import { QuiColor } from "./types";

const COLOR_ARRAY_SIZE = 10;

export const getColor = (color?: QuiColor) => {
  const output: Record<string, string> = {};
  const colors = Array.isArray(color)
    ? color
    : Array(COLOR_ARRAY_SIZE).fill(null);

  for (let index = 0; index < COLOR_ARRAY_SIZE; index++) {
    output[`--qui-color-${index}`] = colors[index]
      ? colors[index]
      : color
      ? `var(--oc-${color}-${index})`
      : `var(--qui-color-primary-${index})`;
  }

  return output;
};
