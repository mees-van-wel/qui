import {
  component$,
  CSSProperties,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import clsx from "clsx";
import classes from "./colorSwatch.module.scss";
import { getSize, QuiSize } from "~/internal";

export type colorSwatchProps = Omit<QwikIntrinsicElements["div"], "style"> & {
  style?: CSSProperties;
  color: string;
  size?: QuiSize;
};

export const ColorSwatch = component$<colorSwatchProps>(
  ({ style, color, size = "md", class: className, ...props }) => {
    return (
      <div
        style={{
          "--qui-color-swatch-color": color,
          "--qui-color-swatch-size": getSize(size),
          ...style,
        }}
        class={clsx(
          classes.root,
          "flex h-6 w-6 items-center justify-center rounded-full bg-primary-6 text-white shadow-inner dark:bg-primary-6",
          className
        )}
        {...props}
      />
    );
  }
);
