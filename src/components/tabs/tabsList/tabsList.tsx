import { component$, Slot, type QwikIntrinsicElements } from "@builder.io/qwik";
import { useTabsContext } from "../tabsContext";
import styles from "./tabsList.module.scss";
import { classBuilder, inject } from "~/internal";

export type TabsListProps = QwikIntrinsicElements["div"];

export const TabsList = component$<TabsListProps>((props) => {
  const cb = classBuilder(styles);
  const { orientation } = useTabsContext();

  return (
    <div
      {...inject(props, {
        class: cb("root", { vertical: orientation === "vertical" }),
      })}
    >
      <Slot />
    </div>
  );
});
