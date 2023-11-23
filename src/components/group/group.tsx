import {
  component$,
  Slot,
  type CSSProperties,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import { type QuiSize, getSize, inject, classBuilder } from "~/internal";
import styles from "./group.module.scss";

export type GroupProps = QwikIntrinsicElements["div"] & {
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: CSSProperties["flexWrap"];
  gap?: QuiSize;
  grow?: boolean;
};

export const Group = component$<GroupProps>(
  ({
    align = "center",
    justify = "flex-start",
    wrap = "wrap",
    gap = "md",
    grow,
    ...props
  }) => {
    const cb = classBuilder(styles);

    return (
      <div
        {...inject(props, {
          style: [
            `--qui-group-align: ${align}`,
            `--qui-group-justify: ${justify}`,
            `--qui-group-wrap: ${wrap}`,
            `--qui-group-gap: ${getSize(gap)}`,
          ],
          class: cb("root", { grow }),
        })}
      >
        <Slot />
      </div>
    );
  }
);
