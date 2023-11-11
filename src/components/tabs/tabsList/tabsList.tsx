import {
  component$,
  type CSSProperties,
  Slot,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import { useTabsContext } from "../tabsContext";
import cslx from "clsx";
import classes from "./tabsList.module.scss";

export type TabsListProps = Omit<QwikIntrinsicElements["div"], "style"> & {
  style?: CSSProperties;
};

export const TabsList = component$<TabsListProps>(
  ({ class: className, ...props }) => {
    const { orientation } = useTabsContext();

    return (
      <div
        class={cslx(
          classes.root,
          {
            [classes["root--vertical"]]: orientation === "vertical",
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
