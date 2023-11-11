import { type Signal, createContextId, useContext } from "@builder.io/qwik";

export type TabsContext = {
  currentTab: Signal<string | undefined>;
  orientation: "horizontal" | "vertical";
};

export const TabsContext = createContextId<TabsContext>(
  "dev.hexa-it.qwik-ui.tabs"
);

export const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context)
    throw new Error("useTabsContext must be used within an Tabs component");

  return context;
};
