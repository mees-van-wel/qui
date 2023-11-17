import { component$, Slot, type QwikIntrinsicElements } from "@builder.io/qwik";
import {
  QuiColor,
  QuiSize,
  getSize,
  getColor,
  inject,
  classBuilder,
} from "~/internal";
import styles from "./badge.module.scss";

export type BadgeSubProps = {
  dot?: QwikIntrinsicElements["div"];
  inner?: QwikIntrinsicElements["div"];
};

export type BadgeVariants = "filled" | "light" | "outline" | "dot";

export type BadgeProps = QwikIntrinsicElements["div"] & {
  subProps?: BadgeSubProps;
  variant?: BadgeVariants;
  size?: QuiSize;
  color?: QuiColor;
  fullWidth?: boolean;
};

const cb = classBuilder(styles);

export const Badge = component$<BadgeProps>(
  ({
    subProps,
    variant = "filled",
    size = "md",
    color,
    fullWidth,
    ...props
  }) => (
    <div
      {...inject(props, {
        style: [`--qui-badge-size: ${getSize(size)}`, getColor(color)],
        class: cb("root", { variant, fullWidth }),
      })}
    >
      {variant === "dot" && (
        <div {...inject(subProps?.dot, { class: styles.dot })} />
      )}
      <div {...inject(subProps?.inner, { class: styles.inner })}>
        <Slot />
      </div>
    </div>
  )
);
