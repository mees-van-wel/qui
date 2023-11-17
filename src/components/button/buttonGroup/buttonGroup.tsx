import { Slot, component$ } from "@builder.io/qwik";
import { Group, GroupProps } from "~/components/group";
import styles from "./buttonGroup.module.scss";
import { inject } from "~/internal";

// TODO orientation support
export const ButtonGroup = component$<GroupProps>((props) => (
  <Group gap={0} {...inject(props, { class: styles.root })}>
    <Slot />
  </Group>
));
