import {
  component$,
  Slot,
  type CSSProperties,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import { type QuiSize, getSize } from "~/internal";
import clsx from "clsx";
import classes from "./group.module.scss";

export type GroupProps = Omit<QwikIntrinsicElements["div"], "style"> & {
  style?: CSSProperties;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: CSSProperties["flexWrap"];
  gap?: QuiSize;
  grow?: boolean;
};

export const Group = component$<GroupProps>(
  ({
    style,
    class: className,
    align = "center",
    justify = "flex-start",
    wrap = "wrap",
    gap = "md",
    grow,
    ...props
  }) => (
    <div
      style={{
        "--qui-group-align": align,
        "--qui-group-justify": justify,
        "--qui-group-wrap": wrap,
        "--qui-group-gap": getSize(gap),
        ...style,
      }}
      class={clsx(
        classes.root,
        {
          [classes["root--grow"]]: grow,
        },
        className
      )}
      {...props}
    >
      <Slot />
    </div>
  )
);
