import { createContextId, useContext } from "@builder.io/qwik";

export type AccordionContext = {
  items: Record<string, boolean>;
  multiple?: boolean;
};

export const AccordionContext = createContextId<AccordionContext>(
  "dev.hexa-it.qwik-ui.accordion",
);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (!context)
    throw new Error(
      "useAccordionContext must be used within an Accordion component",
    );

  return context;
};

export type AccordionItemContext = { id: string };
export const AccordionItemContext = createContextId<AccordionItemContext>(
  "dev.hexa-it.qwik-ui.accordionItem",
);

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);

  if (!context)
    throw new Error(
      "useAccordionItemContext must be used within an AccordionItem component",
    );

  return context;
};
