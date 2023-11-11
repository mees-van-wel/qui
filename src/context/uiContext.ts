import { createContextId } from "@builder.io/qwik";

export type UiContext = {
  locale?: string;
  strings?: {
    nothingFound?: string;
    selectFiles?: string;
  };
};

export const UiContext = createContextId<UiContext>("dev.hexa-it.qwik-ui");
