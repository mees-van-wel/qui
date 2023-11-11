import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconInfoCircle = component$<QwikIntrinsicElements["svg"]>(
  (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-info-circle"
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
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
      <path d="M12 9h.01"></path>
      <path d="M11 12h1v4h1"></path>
    </svg>
  ),
);
