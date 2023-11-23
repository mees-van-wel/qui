import { type Declaration, inlineStyleParser } from "./inlineStyleParser";

interface StyleObject {
  [name: string]: string;
}

type Iterator = (
  property: string,
  value: string,
  declaration: Declaration
) => void;

export const styleToObject = (
  style: string,
  iterator?: Iterator
): StyleObject | null => {
  let styleObject: StyleObject | null = null;

  if (!style || typeof style !== "string") {
    return styleObject;
  }

  const declarations = inlineStyleParser(style);
  const hasIterator = typeof iterator === "function";

  declarations.forEach((declaration) => {
    if (declaration.type !== "declaration") {
      return;
    }

    const { property, value } = declaration;

    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      styleObject = styleObject || {};
      styleObject[property] = value;
    }
  });

  return styleObject;
};
