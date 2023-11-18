import { component$, Slot, type QwikIntrinsicElements } from "@builder.io/qwik";
import { useTabsContext } from "../tabsContext";
import styles from "./tabsTab.module.scss";
import { classBuilder, inject } from "~/internal";

export type TabsTabProps = QwikIntrinsicElements["button"] & {
  value: string;
  disabled?: boolean;
};

const cb = classBuilder(styles);

export const TabsTab = component$<TabsTabProps>(
  ({ value, disabled, ...props }) => {
    const { currentTab, orientation } = useTabsContext();

    return (
      <button
        onClick$={() => {
          currentTab.value = value;
        }}
        disabled={disabled}
        {...inject(props, {
          class: cb("root", {
            active: value === currentTab.value,
            horizontal: orientation === "horizontal",
            vertical: orientation === "vertical",
          }),
        })}
      >
        <Slot />
      </button>
    );
  },
);
