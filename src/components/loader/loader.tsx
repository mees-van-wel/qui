import {
  type QuiSize,
  IconLoadingDots,
  IconLoadingRing,
  getSize,
  getColor,
  QuiColor,
  inject,
  classBuilder,
} from "~/internal";
import styles from "./loader.module.scss";
import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export type LoaderVariants = "dots" | "ring";
export type LoaderColors = "current" | QuiColor;

export type LoaderProps = QwikIntrinsicElements["div"] & {
  size?: QuiSize;
  color?: LoaderColors;
  variant?: LoaderVariants;
};

export const Loader = component$<LoaderProps>(
  ({ size = "md", variant = "ring", color, ...props }) => {
    const cb = classBuilder(styles);
    const Component = variant === "ring" ? IconLoadingRing : IconLoadingDots;

    return (
      <Component
        {...inject(props, {
          style: [
            `--qui-loader-size: ${getSize(size)}`,
            color !== "current" && getColor(color),
          ],
          class: cb("root", { "color-current": color === "current" }),
        })}
      />
    );
  }
);
