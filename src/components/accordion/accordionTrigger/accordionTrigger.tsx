import {
  component$,
  type CSSProperties,
  type QwikIntrinsicElements,
  Slot,
} from "@builder.io/qwik";
import {
  useAccordionContext,
  useAccordionItemContext,
} from "../accordionContext";
import cslx from "clsx";
import classes from "./accordionTrigger.module.scss";
import { IconChevronDown } from "~/internal";

export type AccordionTriggerProps = Omit<
  QwikIntrinsicElements["button"],
  "style"
> & {
  style?: CSSProperties;
};

export const AccordionTrigger = component$<AccordionTriggerProps>(
  ({ class: className, ...props }) => {
    const accordionContext = useAccordionContext();
    const { id } = useAccordionItemContext();

    return (
      <button
        class={cslx(
          classes.root,
          {
            [classes["root--active"]]: accordionContext.items[id],
          },
          className
        )}
        onClick$={() => {
          accordionContext.items[id] = !accordionContext.items[id];

          if (!accordionContext.multiple)
            Object.keys(accordionContext.items)
              .filter((key) => key !== id)
              .forEach((key) => {
                accordionContext.items[key] = false;
              });
        }}
        {...props}
      >
        <Slot />
        <IconChevronDown class={cslx(classes.icon)} />
      </button>
    );
  }
);
