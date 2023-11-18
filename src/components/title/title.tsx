import {
  type Component,
  type QwikIntrinsicElements,
  Slot,
  component$,
} from "@builder.io/qwik";
import styles from "./title.module.scss";
import { inject } from "~/internal";

export type TitleOrders = 1 | 2 | 3 | 4 | 5 | 6;

export type TitleProps = QwikIntrinsicElements["h1"] & {
  order?: TitleOrders;
};

export const Title = component$<TitleProps>(({ order = 1, ...props }) => {
  const Component = `h${order}` as never as Component<
    QwikIntrinsicElements["h1"]
  >;

  return (
    <Component {...inject(props, { class: styles.root })}>
      <Slot />
    </Component>
  );
});
