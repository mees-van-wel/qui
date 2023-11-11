import {
  component$,
  type QwikIntrinsicElements,
  Slot,
  type CSSProperties,
} from "@builder.io/qwik";
import { useTabsContext } from "../tabsContext";
import classes from "./tabsContent.module.scss";
import cslx from "clsx";

export type TabsContentProps = Omit<QwikIntrinsicElements["div"], "style"> & {
  style?: CSSProperties;
  value: string;
};

export const TabsContent = component$<TabsContentProps>(
  ({ class: className, value, ...props }) => {
    const { currentTab } = useTabsContext();

    return (
      <div
        class={cslx(
          classes.root,
          {
            [classes["root--hidden"]]: currentTab.value !== value,
          },
          className
        )}
        {...props}
      >
        <Slot />
      </div>
    );
  }
);
