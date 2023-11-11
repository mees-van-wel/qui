import { Slot, component$ } from "@builder.io/qwik";
import { Group, GroupProps } from "~/components/group";
import classes from "./buttonGroup.module.scss";
import clsx from "clsx";

// TODO orientation support
export const ButtonGroup = component$<GroupProps>(
  ({ class: className, ...props }) => (
    <Group class={clsx(classes.root, className)} gap={0} {...props}>
      <Slot />
    </Group>
  )
);
