import {
  type CSSProperties,
  type QwikIntrinsicElements,
  Slot,
  component$,
} from "@builder.io/qwik";
import clsx from "clsx";
import classes from "./paper.module.scss";

export type PaperVariants = "foreground" | "background";

export type PaperProps = Omit<QwikIntrinsicElements["div"], "style"> & {
  style?: CSSProperties;
  component?: string;
  variant?: PaperVariants;
  glass?: boolean;
  noPadding?: boolean;
  fullWidth?: boolean;
};

export const Paper = component$<PaperProps>(
  ({
    style,
    class: className,
    variant = "foreground",
    glass,
    noPadding,
    fullWidth,
    ...props
  }) => (
    <div
      style={{
        "--qui-paper-background-color": `var(--qui-color-${variant})`,
        ...style,
      }}
      class={clsx(
        classes.root,
        {
          [classes["root--glass"]]: glass,
          [classes["root--no-padding"]]: noPadding,
          [classes["root--full-width"]]: fullWidth,
        },
        className
      )}
      {...props}
    >
      <Slot />
    </div>
  )
);
