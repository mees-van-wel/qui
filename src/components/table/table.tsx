import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";
import cslx from "clsx";
import classes from "./table.module.scss";

export const Table = component$<QwikIntrinsicElements["table"]>((props) => {
  return (
    <table class={cslx(classes.root, props.class)} {...props}>
      <Slot />
    </table>
  );
});
