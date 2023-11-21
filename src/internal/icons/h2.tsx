import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconH2 = component$<QwikIntrinsicElements["div"]>((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-h-2"
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
    <path d="M17 12a2 2 0 1 1 4 0c0 .591 -.417 1.318 -.816 1.858l-3.184 4.143l4 0"></path>
    <path d="M4 6v12"></path>
    <path d="M12 6v12"></path>
    <path d="M11 18h2"></path>
    <path d="M3 18h2"></path>
    <path d="M4 12h8"></path>
    <path d="M3 6h2"></path>
    <path d="M11 6h2"></path>
  </svg>
));
