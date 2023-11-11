import {
  type CSSProperties,
  type Component,
  type QwikIntrinsicElements,
  Slot,
  component$,
} from "@builder.io/qwik";
import clsx from "clsx";
import classes from "./title.module.scss";

export type TitleOrders = 1 | 2 | 3 | 4 | 5 | 6;

export type TitleProps = Omit<QwikIntrinsicElements["h1"], "style"> & {
  style?: CSSProperties;
  order?: TitleOrders;
};

export const Title = component$<TitleProps>(
  ({ style, class: className, order = 1, ...props }) => {
    const Component = `h${order}` as never as Component<
      QwikIntrinsicElements["h1"]
    >;

    return (
      <Component
        style={{
          "--qui-qui-title-font-size": `var(--qui-qui-h${order}-font-size)`,
          "--qui-qui-title-line-height": `var(--qui-qui-h${order}-line-height)`,
          "--qui-qui-title-font-weight": `var(--qui-qui-h${order}-font-weight)`,
          ...style,
        }}
        class={clsx(classes.root, className)}
        {...props}
      >
        <Slot />
      </Component>
    );
  }
);
