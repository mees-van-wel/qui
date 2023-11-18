import { createContextId } from "@builder.io/qwik";

export type ChoiceContext = {
  disabled: boolean | undefined;
  id: string;
};

export const ChoiceContext = createContextId<ChoiceContext>(
  "dev.hexa-it.qwik-ui.choice",
);
