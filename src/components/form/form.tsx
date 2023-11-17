import { type QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";

export const Form = component$<QwikIntrinsicElements["form"]>(
  ({ autoComplete = "off", ...props }) => (
    <form autoComplete={autoComplete} preventdefault:submit {...props}>
      <Slot />
    </form>
  ),
);
