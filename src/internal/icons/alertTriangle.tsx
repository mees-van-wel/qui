import {
  component$,
  type CSSProperties,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";

export const IconAlertTriangle = component$<
  Omit<QwikIntrinsicElements["svg"], "style"> & { style?: CSSProperties }
>(({ style, ...props }) => (
  <svg
    style={{ marginTop: "-2px", ...style }}
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-alert-triangle"
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
    <path d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z"></path>
    <path d="M12 9v4"></path>
    <path d="M12 17h.01"></path>
  </svg>
));
