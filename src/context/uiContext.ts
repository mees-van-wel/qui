import { createContextId } from "@builder.io/qwik";

export type UiContext = {
  locale?: string;
  strings?: {
    nothingFound?: string;
    selectFile?: string;
    selectFiles?: string;
  };
};

export const UiContext = createContextId<UiContext>("dev.hexa-it.qwik-ui");
