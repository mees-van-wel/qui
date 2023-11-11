import { QuiSize } from "./types";
export const getSize = (spacing: QuiSize) => {
  if (typeof spacing === "number") return spacing + "px";

  // TODO Switch for overwritable js or css vars
  switch (spacing) {
    case "xs":
      return ".625rem";
    case "sm":
      return ".75rem";
    case "md":
      return "1rem";
    case "lg":
      return "1.25rem";
    case "xl":
      return "2rem";
    default:
      return spacing;
  }
};
