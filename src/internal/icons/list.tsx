import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconList = component$<QwikIntrinsicElements["div"]>((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-list"
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
    <path d="M9 6l11 0"></path>
    <path d="M9 12l11 0"></path>
    <path d="M9 18l11 0"></path>
    <path d="M5 6l0 .01"></path>
    <path d="M5 12l0 .01"></path>
    <path d="M5 18l0 .01"></path>
  </svg>
));
