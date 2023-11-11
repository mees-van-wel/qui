import {
  component$,
  Slot,
  useId,
  useTask$,
  useContextProvider,
  type QwikIntrinsicElements,
  type CSSProperties,
} from "@builder.io/qwik";
import { AccordionItemContext, useAccordionContext } from "../accordionContext";
import cslx from "clsx";
import classes from "./accordionItem.module.scss";

export type AccordionItemProps = Omit<QwikIntrinsicElements["div"], "style"> & {
  style?: CSSProperties;
  defaultOpen?: boolean;
};

export const AccordionItem = component$<AccordionItemProps>(
  ({ class: className, defaultOpen, ...props }) => {
    const randomId = useId();
    const accordionContext = useAccordionContext();
    useContextProvider(AccordionItemContext, { id: randomId });

    useTask$(() => {
      accordionContext.items[randomId] = !!defaultOpen;
    });

    return (
      <div class={cslx(classes.root, className)} {...props}>
        <Slot />
      </div>
    );
  }
);
