import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconArrowForwardUp = component$<QwikIntrinsicElements["div"]>(
  (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-arrow-forward-up"
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
      <path d="M15 14l4 -4l-4 -4"></path>
      <path d="M19 10h-11a4 4 0 1 0 0 8h1"></path>
    </svg>
  )
);
