import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { UiContext } from "./uiContext";
import "./main.scss";

export const UiContextProvider = component$<UiContext>(() => {
  const uiContext = useStore<UiContext>({});
  useContextProvider(UiContext, uiContext);

  // useOnDocument(
  //   "keydown",
  //   $((e) => {
  //     const { code } = e as KeyboardEvent;
  //     if (code === "Tab") document.body.classList.add("user-is-tabbing");
  //   }),
  // );

  // useOnDocument(
  //   "mousedown",
  //   $(() => {
  //     document.body.classList.remove("user-is-tabbing");
  //   }),
  // );

  return (
    <div
      style={
        {
          // backgroundColor: "var(--bg-color)",
        }
      }
    >
      <Slot />
    </div>
  );
});
