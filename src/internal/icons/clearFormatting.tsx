import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconClearFormatting = component$<QwikIntrinsicElements["div"]>(
  (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-clear-formatting"
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
      <path d="M17 15l4 4m0 -4l-4 4"></path>
      <path d="M7 6v-1h11v1"></path>
      <path d="M7 19l4 0"></path>
      <path d="M13 5l-4 14"></path>
    </svg>
  )
);
