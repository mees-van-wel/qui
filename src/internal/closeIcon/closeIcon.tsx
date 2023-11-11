import { QwikIntrinsicElements, component$ } from "@builder.io/qwik";
import { IconX } from "../icons";
import clsx from "clsx";
import classes from "./closeIcon.module.scss";

export const CloseIcon = component$<QwikIntrinsicElements["svg"]>(
  ({ class: classname, ...props }) => (
    <IconX class={clsx(classes.root, classname)} {...props} />
  )
);
