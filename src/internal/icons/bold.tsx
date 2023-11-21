import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconBold = component$<QwikIntrinsicElements["div"]>((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-bold"
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
    <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z"></path>
    <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7"></path>
  </svg>
));
