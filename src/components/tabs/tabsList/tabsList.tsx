import { component$, Slot, type QwikIntrinsicElements } from "@builder.io/qwik";
import { useTabsContext } from "../tabsContext";
import styles from "./tabsList.module.scss";
import { classBuilder, inject } from "~/internal";

export type TabsListProps = QwikIntrinsicElements["div"];

const cb = classBuilder(styles);

export const TabsList = component$<TabsListProps>((props) => {
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
