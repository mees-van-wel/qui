import { component$, type QwikIntrinsicElements, Slot } from "@builder.io/qwik";
import { useTabsContext } from "../tabsContext";
import styles from "./tabsContent.module.scss";
import { classBuilder, inject } from "~/internal";

export type TabsContentProps = QwikIntrinsicElements["div"] & {
  value: string;
};

const cb = classBuilder(styles);

export const TabsContent = component$<TabsContentProps>(
  ({ value, ...props }) => {
    const { currentTab } = useTabsContext();

    return (
      <div
        {...inject(props, {
          class: cb("root", { hidden: currentTab.value !== value }),
        })}
      >
        <Slot />
      </div>
    );
  },
);