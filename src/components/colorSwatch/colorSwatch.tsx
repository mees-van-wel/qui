import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";
import styles from "./colorSwatch.module.scss";
import { getSize, inject, QuiSize } from "~/internal";

export type ColorSwatchProps = Omit<QwikIntrinsicElements["div"], "color"> & {
  color: string;
  size?: QuiSize;
};

export const ColorSwatch = component$<ColorSwatchProps>(
  ({ color, size = "md", ...props }) => {
    return (
      <div
        {...inject(props, {
          style: [
            `--qui-color-swatch-color: ${color}`,
            `--qui-color-swatch-size: ${getSize(size)}`,
          ],
          class: styles.root,
        })}
      />
    );
  }
);
