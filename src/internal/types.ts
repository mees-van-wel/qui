export type Falsy = 0 | "" | null | undefined | false;

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

export type InputBase<T, V = T> = {
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  value?: T;
  onChange$?: (value: V) => any;
};
