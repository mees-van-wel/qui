import {
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

export type AccordionProps = QwikIntrinsicElements["div"] & {
  multiple?: boolean;
};

const _Accordion = component$<AccordionProps>(({ multiple, ...props }) => {
  const accordionContext = useStore<AccordionContext>({
    items: {},
    multiple,
  });

  useContextProvider(AccordionContext, accordionContext);

  return (
    <div {...props}>
      <Slot />
    </div>
  );
}) as Component<AccordionProps> & AccordionCompound;

_Accordion.Item = AccordionItem;
_Accordion.Trigger = AccordionTrigger;
_Accordion.Content = AccordionContent;

export const Accordion = _Accordion;
