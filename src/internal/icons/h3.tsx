import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconH3 = component$<QwikIntrinsicElements["svg"]>((props) => (
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
    <path d="M19 14a2 2 0 1 0 -2 -2"></path>
    <path d="M17 16a2 2 0 1 0 2 -2"></path>
    <path d="M4 6v12"></path>
    <path d="M12 6v12"></path>
    <path d="M11 18h2"></path>
    <path d="M3 18h2"></path>
    <path d="M4 12h8"></path>
    <path d="M3 6h2"></path>
    <path d="M11 6h2"></path>
  </svg>
));
