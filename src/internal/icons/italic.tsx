import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconItalic = component$<QwikIntrinsicElements["svg"]>((props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-italic"
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
    <path d="M11 5l6 0"></path>
    <path d="M7 19l6 0"></path>
    <path d="M14 5l-4 14"></path>
  </svg>
));
