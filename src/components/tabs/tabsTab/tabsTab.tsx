import {
  component$,
  type CSSProperties,
  Slot,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import cslx from "clsx";
import { useTabsContext } from "../tabsContext";
import classes from "./tabsTab.module.scss";

export type TabsTabProps = Omit<QwikIntrinsicElements["button"], "style"> & {
  style?: CSSProperties;
  value: string;
  disabled?: boolean;
};

export const TabsTab = component$<TabsTabProps>(
  ({ class: className, value, disabled, ...props }) => {
    const { currentTab, orientation } = useTabsContext();

    return (
      <button
        class={cslx(
          classes.root,
          {
            [classes["root--active"]]: value === currentTab.value,
            [classes["root--horizontal"]]: orientation === "horizontal",
            [classes["root--vertical"]]: orientation === "vertical",
          },
          className
        )}
        onClick$={() => {
          currentTab.value = value;
        }}
        disabled={disabled}
        {...props}
      >
        <Slot />
      </button>
    );
  }
);
