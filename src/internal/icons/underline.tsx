import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconUnderline = component$<QwikIntrinsicElements["div"]>(
  (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-underline"
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
      <path d="M7 5v5a5 5 0 0 0 10 0v-5"></path>
      <path d="M5 19h14"></path>
    </svg>
  )
);
