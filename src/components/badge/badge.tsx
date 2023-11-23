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

export type BadgeIntrinsic = {
  dot?: QwikIntrinsicElements["div"];
  inner?: QwikIntrinsicElements["div"];
};

export type BadgeVariants = "filled" | "light" | "outline" | "dot";

export type BadgeProps = QwikIntrinsicElements["div"] & {
  intrinsic?: BadgeIntrinsic;
  variant?: BadgeVariants;
  size?: QuiSize;
  color?: QuiColor;
  fullWidth?: boolean;
};

export const Badge = component$<BadgeProps>(
  ({
    intrinsic,
    variant = "filled",
    size = "md",
    color,
    fullWidth,
    ...props
  }) => {
    const cb = classBuilder(styles);

    return (
      <div
        {...inject(props, {
          style: [`--qui-badge-size: ${getSize(size)}`, getColor(color)],
          class: cb("root", { variant, fullWidth }),
        })}
      >
        {variant === "dot" && (
          <div {...inject(intrinsic?.dot, { class: styles.dot })} />
        )}
        <div {...inject(intrinsic?.inner, { class: styles.inner })}>
          <Slot />
        </div>
      </div>
    );
  }
);
