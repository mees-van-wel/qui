import {
  component$,
  Slot,
  useId,
  useTask$,
  useContextProvider,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import { AccordionItemContext, useAccordionContext } from "../accordionContext";
import styles from "./accordionItem.module.scss";
import { inject } from "~/internal";

export type AccordionItemProps = QwikIntrinsicElements["div"] & {
  defaultOpen?: boolean;
};

export const AccordionItem = component$<AccordionItemProps>(
  ({ defaultOpen, ...props }) => {
    const randomId = useId();
    const accordionContext = useAccordionContext();
    useContextProvider(AccordionItemContext, { id: randomId });

    useTask$(() => {
      accordionContext.items[randomId] = !!defaultOpen;
    });

    return (
      <div {...inject(props, { class: styles.root })}>
        <Slot />
      </div>
    );
  },
);
