import {
  component$,
  type QwikIntrinsicElements,
  Slot,
  $,
} from "@builder.io/qwik";
import {
  useAccordionContext,
  useAccordionItemContext,
} from "../accordionContext";
import cslx from "clsx";
import styles from "./accordionTrigger.module.scss";
import { IconChevronDown, classBuilder, inject } from "~/internal";

export type AccordionTriggerProps = QwikIntrinsicElements["button"];

export const AccordionTrigger = component$<AccordionTriggerProps>((props) => {
  const cb = classBuilder(styles);
  const accordionContext = useAccordionContext();
  const { id } = useAccordionItemContext();

  const clickHandler = $(() => {
    accordionContext.items[id] = !accordionContext.items[id];

    if (accordionContext.multiple) return;

    Object.keys(accordionContext.items)
      .filter((key) => key !== id)
      .forEach((key) => {
        accordionContext.items[key] = false;
      });
  });

  return (
    <button
      {...inject(props, {
        class: cb("root", { active: accordionContext.items[id] }),
        onClick$: clickHandler,
      })}
    >
      <Slot />
      <IconChevronDown class={cslx(styles.icon)} />
    </button>
  );
});
