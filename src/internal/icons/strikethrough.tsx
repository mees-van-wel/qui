import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconStrikethrough = component$<QwikIntrinsicElements["div"]>(
  (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-strikethrough"
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
      <path d="M5 12l14 0"></path>
      <path d="M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4 2 0 0 1 -4 -1.5"></path>
    </svg>
  )
);
