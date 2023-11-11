import {
  component$,
  Slot,
  type CSSProperties,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import clsx from "clsx";
import classes from "./stack.module.scss";
import { type QuiSize, getSize } from "~/internal";

export type StackProps = Omit<QwikIntrinsicElements["div"], "style"> & {
  style?: CSSProperties;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  gap?: QuiSize;
};

export const Stack = component$<StackProps>(
  ({
    style,
    class: className,
    align = "flex-start",
    justify = "stretch",
    gap = "md",
    ...props
  }) => (
    <div
      style={{
        "--qui-stack-align": align,
        "--qui-stack-justify": justify,
        "--qui-stack-gap": getSize(gap),
        ...style,
      }}
      class={clsx(classes.root, className)}
      {...props}
    >
      <Slot />
    </div>
  )
);
