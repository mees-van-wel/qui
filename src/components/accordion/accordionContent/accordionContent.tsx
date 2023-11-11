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
import classes from "./accordionContent.module.scss";

export type AccordionContentProps = Omit<
  QwikIntrinsicElements["div"],
  "style"
> & {
  style?: CSSProperties;
};

export const AccordionContent = component$<AccordionContentProps>(
  ({ class: className, ...props }) => {
    const accordionContext = useAccordionContext();
    const { id } = useAccordionItemContext();

    return (
      <div
        class={cslx(
          classes.root,
          "block overflow-hidden transition-all duration-300 ease-out",
          {
            [classes["root--open"]]: accordionContext.items[id],
          },
          className
        )}
        {...props}
      >
        <div class={cslx(classes.inner)}>
          <Slot />
        </div>
      </div>
    );
  }
);
