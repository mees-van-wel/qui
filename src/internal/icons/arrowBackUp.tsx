import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconArrowBackUp = component$<QwikIntrinsicElements["div"]>(
  (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-arrow-back-up"
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
      <path d="M9 14l-4 -4l4 -4"></path>
      <path d="M5 10h11a4 4 0 1 1 0 8h-1"></path>
    </svg>
  )
);
