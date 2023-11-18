import {
  component$,
  Slot,
  type CSSProperties,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import styles from "./stack.module.scss";
import { type QuiSize, getSize, inject } from "~/internal";

export type StackProps = QwikIntrinsicElements["div"] & {
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  gap?: QuiSize;
};

export const Stack = component$<StackProps>(
  ({ align = "flex-start", justify = "stretch", gap = "md", ...props }) => (
    <div
      {...inject(props, {
        style: [
          `--qui-stack-align: ${align}`,
          `--qui-stack-justify: ${justify}`,
          `--qui-stack-gap: ${getSize(gap)}`,
        ],
        class: styles.root,
      })}
    >
      <Slot />
    </div>
  ),
);
