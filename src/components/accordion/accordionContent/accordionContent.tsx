import { component$, type QwikIntrinsicElements, Slot } from "@builder.io/qwik";
import {
  useAccordionContext,
  useAccordionItemContext,
} from "../accordionContext";
import styles from "./accordionContent.module.scss";
import { classBuilder, inject } from "~/internal";

export type AccordionContentProps = QwikIntrinsicElements["div"];

export const AccordionContent = component$<AccordionContentProps>((props) => {
  const cb = classBuilder(styles);
  const accordionContext = useAccordionContext();
  const { id } = useAccordionItemContext();

  return (
    <div
      {...inject(props, {
        class: cb("root", { open: accordionContext.items[id] }),
      })}
    >
      <div class={styles.inner}>
        <Slot />
      </div>
    </div>
  );
});
