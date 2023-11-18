import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import styles from "./table.module.scss";
import { inject } from "~/internal";

export const Table = component$<QwikIntrinsicElements["table"]>((props) => {
  return (
    <table {...inject(props, { class: styles.root })}>
      <Slot />
    </table>
  );
});
