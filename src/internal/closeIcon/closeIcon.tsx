import { QwikIntrinsicElements, component$ } from "@builder.io/qwik";
import { IconX } from "../icons";
import clsx from "clsx";
import classes from "./closeIcon.module.scss";

export type CloseIconProps = QwikIntrinsicElements["svg"];

export const CloseIcon = component$<CloseIconProps>(
  ({ class: classname, ...props }) => (
    <IconX class={clsx(classes.root, classname)} {...props} />
  )
);
