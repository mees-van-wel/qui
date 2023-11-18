import { type QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";
import styles from "./paper.module.scss";
import { classBuilder, inject } from "~/internal";

export type PaperVariants =
  | "foreground"
  | "midground"
  | "background"
  | "neutral";

export type PaperProps = QwikIntrinsicElements["div"] & {
  component?: string;
  variant?: PaperVariants;
  glass?: boolean;
  noPadding?: boolean;
  fullWidth?: boolean;
};

const cb = classBuilder(styles);

export const Paper = component$<PaperProps>(
  ({ variant = "foreground", glass, noPadding, fullWidth, ...props }) => (
    <div
      {...inject(props, {
        style: `--qui-paper-background-color: var(--qui-color-${variant})`,
        class: cb("root", { glass, noPadding, fullWidth }),
      })}
    >
      <Slot />
    </div>
  ),
);
