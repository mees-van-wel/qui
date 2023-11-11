import {
  component$,
  Slot,
  type QwikIntrinsicElements,
  CSSProperties,
} from "@builder.io/qwik";
import { QuiColor, QuiSize, getSize, getColor } from "~/internal";
import clsx from "clsx";
import classes from "./badge.module.scss";

export type BadgeStyles = {
  root?: CSSProperties;
  dot?: CSSProperties;
  inner?: CSSProperties;
};

export type BadgeClassNames = {
  root?: string;
  dot?: string;
  inner?: string;
};

export type BadgeVariants = "filled" | "light" | "outline" | "dot";

export type BadgeProps = Omit<
  QwikIntrinsicElements["div"],
  "style" | "class" | "color"
> & {
  styles?: BadgeStyles;
  classNames?: BadgeClassNames;
  variant?: BadgeVariants;
  size?: QuiSize;
  color?: QuiColor;
  fullWidth?: boolean;
};

export const Badge = component$<BadgeProps>(
  ({
    styles,
    classNames,
    variant = "filled",
    size = "md",
    color,
    fullWidth,
    ...props
  }) => (
    <div
      style={{
        "--qui-badge-size": getSize(size),
        ...getColor(color),
        ...styles?.root,
      }}
      class={clsx(
        classes.root,
        classes[`root--variant-${variant}`],
        {
          [classes["root--full-width"]]: fullWidth,
        },
        classNames?.root
      )}
      {...props}
    >
      {variant === "dot" && (
        <div
          style={styles?.dot}
          class={clsx(classes.root__dot, classNames?.dot)}
        />
      )}
      <div
        style={styles?.inner}
        class={clsx(classes.root__inner, classNames?.inner)}
      >
        <Slot />
      </div>
    </div>
  )
);
