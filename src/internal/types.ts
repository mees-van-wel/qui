export type Color = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export type QuiColor =
  | "gray"
  | "red"
  | "pink"
  | "grape"
  | "violet"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "green"
  | "lime"
  | "yellow"
  | "orange"
  | Color;

export type QuiSize = "xs" | "sm" | "md" | "lg" | "xl" | (string & {}) | number;
