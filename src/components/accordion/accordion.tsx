import {
  type CSSProperties,
  type Component,
  component$,
  Slot,
  type QwikIntrinsicElements,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { AccordionItem } from "./accordionItem";
import { AccordionTrigger } from "./accordionTrigger";
import { AccordionContent } from "./accordionContent";
import { AccordionContext } from "./accordionContext";

export type AccordionCompound = {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
};

export type AccordionProps = Omit<QwikIntrinsicElements["div"], "style"> & {
  style?: CSSProperties;
  multiple?: boolean;
};

const _Accordion = component$<AccordionProps>(
  ({ class: className, multiple, ...props }) => {
    const accordionContext = useStore<AccordionContext>({
      items: {},
      multiple,
    });

    useContextProvider(AccordionContext, accordionContext);

    return (
      <div class={className} {...props}>
        <Slot />
      </div>
    );
  }
) as Component<AccordionProps> & AccordionCompound;

_Accordion.Item = AccordionItem;
_Accordion.Trigger = AccordionTrigger;
_Accordion.Content = AccordionContent;

export const Accordion = _Accordion;
