import {
  type CSSProperties,
  type Component,
  Slot,
  useContextProvider,
  useTask$,
  useSignal,
  component$,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import cslx from "clsx";
import { TabsList } from "./tabsList";
import { TabsContent } from "./tabsContent";
import { TabsTab } from "./tabsTab";
import { TabsContext } from "./tabsContext";
import classes from "./tabs.module.scss";

export type TabsCompound = {
  List: typeof TabsList;
  Tab: typeof TabsTab;
  Content: typeof TabsContent;
};

export type TabsProps = Omit<QwikIntrinsicElements["div"], "style"> & {
  style?: CSSProperties;
  defaultValue?: string;
  onChange$?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
};

const _Tabs = component$<TabsProps>(
  ({
    class: className,
    defaultValue,
    onChange$,
    orientation = "horizontal",
    ...props
  }) => {
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
) as Component<TabsProps> & TabsCompound;

_Tabs.List = TabsList;
_Tabs.Tab = TabsTab;
_Tabs.Content = TabsContent;

export const Tabs = _Tabs;
