import clsx from "clsx";
import {
  type QuiSize,
  IconLoadingDots,
  IconLoadingRing,
  getSize,
  getColor,
  QuiColor,
} from "~/internal";
import classes from "./loader.module.scss";
import {
  component$,
  type CSSProperties,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";

export type LoaderVariants = "dots" | "ring";
export type LoaderColors = "current" | QuiColor;

export type LoaderProps = Omit<
  QwikIntrinsicElements["svg"],
  "style" | "color"
> & {
  style?: CSSProperties;
  size?: QuiSize;
  color?: LoaderColors;
  variant?: LoaderVariants;
};

export const Loader = component$<LoaderProps>(
  ({
    style,
    class: className,
    size = "md",
    variant = "ring",
    color,
    ...props
  }) => {
    const Component = variant === "ring" ? IconLoadingRing : IconLoadingDots;

    return (
      <Component
        style={{
          "--qui-loader-size": getSize(size),
          ...(color !== "current" ? getColor(color) : {}),
          ...style,
        }}
        class={clsx(
          classes.root,
          {
            [classes["root--color-current"]]: color === "current",
          },
          className
        )}
        {...props}
      />
    );
  }
);
