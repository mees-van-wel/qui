import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconAlignRight = component$<QwikIntrinsicElements["div"]>(
  (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-align-right"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 6l16 0"></path>
      <path d="M10 12l10 0"></path>
      <path d="M6 18l14 0"></path>
    </svg>
  )
);
