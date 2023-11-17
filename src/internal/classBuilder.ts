import { camelToKebab } from "./camelToKebab";
import type { Falsy } from "./types";

export const classBuilder =
  (styles: CSSModuleClasses) =>
  (element: string, modifiers: Record<string, string | (boolean | Falsy)>) =>
    [
      styles[element],
      ...Object.entries(modifiers).map(([key, value]) =>
        typeof value === "string"
          ? styles[`${element}--${camelToKebab(key)}-${camelToKebab(value)}`]
          : value
          ? styles[`${element}--${camelToKebab(key)}`]
          : undefined
      ),
    ].join(" ");
