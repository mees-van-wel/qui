import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconAlignCenter = component$<QwikIntrinsicElements["svg"]>(
  (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-align-center"
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
      <path d="M8 12l8 0"></path>
      <path d="M6 18l12 0"></path>
    </svg>
  ),
);
