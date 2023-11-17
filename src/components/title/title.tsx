import {
  type Component,
  type QwikIntrinsicElements,
  Slot,
  component$,
} from "@builder.io/qwik";
import clsx from "clsx";
import classes from "./title.module.scss";

export type TitleOrders = 1 | 2 | 3 | 4 | 5 | 6;

export type TitleProps = QwikIntrinsicElements["h1"] & {
  order?: TitleOrders;
};

export const Title = component$<TitleProps>(
  ({ class: className, order = 1, ...props }) => {
    const Component = `h${order}` as never as Component<
      QwikIntrinsicElements["h1"]
    >;

    return (
      <Component class={clsx(classes.root, className)} {...props}>
        <Slot />
      </Component>
    );
  }
);
