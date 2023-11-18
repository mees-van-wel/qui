import { QwikIntrinsicElements, component$ } from "@builder.io/qwik";
import { IconX } from "../icons";
import styles from "./closeIcon.module.scss";
import { inject } from "../inject";

export type CloseIconProps = QwikIntrinsicElements["svg"];

export const CloseIcon = component$<CloseIconProps>((props) => (
  <IconX {...inject(props, { class: styles.root })} />
));
