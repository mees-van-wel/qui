import {
  type Component,
  Slot,
  useContextProvider,
  useTask$,
  useSignal,
  component$,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import { TabsList } from "./tabsList";
import { TabsContent } from "./tabsContent";
import { TabsTab } from "./tabsTab";
import { TabsContext } from "./tabsContext";
import styles from "./tabs.module.scss";
import { classBuilder, inject } from "~/internal";

export type TabsCompound = {
  List: typeof TabsList;
  Tab: typeof TabsTab;
  Content: typeof TabsContent;
};

export type TabsProps = QwikIntrinsicElements["div"] & {
  defaultValue?: string;
  onChange$?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
};

const cb = classBuilder(styles);

const _Tabs = component$<TabsProps>(
  ({ defaultValue, onChange$, orientation = "horizontal", ...props }) => {
    const currentTab = useSignal(defaultValue);

    useContextProvider(TabsContext, {
      currentTab,
      orientation,
    });

    useTask$(({ track }) => {
      track(() => currentTab.value);

      if (onChange$ && currentTab.value) onChange$(currentTab.value);
    });

    return (
      <div
        {...inject(props, {
          class: cb("root", { vertical: orientation === "vertical" }),
        })}
      >
        <Slot />
      </div>
    );
  },
) as Component<TabsProps> & TabsCompound;

_Tabs.List = TabsList;
_Tabs.Tab = TabsTab;
_Tabs.Content = TabsContent;

export const Tabs = _Tabs;
