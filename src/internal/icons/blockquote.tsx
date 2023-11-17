import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconBlockquote = component$<QwikIntrinsicElements["svg"]>(
  (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-blockquote"
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
      <path d="M6 15h15"></path>
      <path d="M21 19h-15"></path>
      <path d="M15 11h6"></path>
      <path d="M21 7h-6"></path>
      <path d="M9 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2"></path>
      <path d="M3 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2"></path>
    </svg>
  ),
);
