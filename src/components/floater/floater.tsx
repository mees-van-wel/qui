import {
  type Signal,
  Slot,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  computePosition,
  flip,
  shift,
  offset,
  autoUpdate,
} from "@floating-ui/dom";
import classes from "./floater.module.scss";
import { getZIndex } from "~/internal";

export const Floater = component$(
  ({ relativeRef }: { relativeRef: Signal<HTMLElement | undefined> }) => {
    const floaterRef = useSignal<HTMLElement>();
    const floaterPosition = useStore<{
      left: number | undefined;
      top: number | undefined;
    }>({
      left: undefined,
      top: undefined,
    });

    useVisibleTask$(({ cleanup }) => {
      function updatePosition() {
        if (!relativeRef?.value || !floaterRef.value) return;
        computePosition(relativeRef.value, floaterRef.value, {
          placement: "bottom-start",
          middleware: [flip(), shift(), offset(6)],
        }).then(({ x, y }) => {
          floaterPosition.left = x;
          floaterPosition.top = y;
        });
      }

      if (!relativeRef?.value || !floaterRef.value) return;

      const clean = autoUpdate(
        relativeRef.value,
        floaterRef.value,
        updatePosition
      );

      cleanup(() => {
        clean();
      });
    });

    return (
      <div
        ref={floaterRef}
        style={{
          "--qui-floater-opacity": floaterPosition.top !== undefined ? 1 : 0,
          "--qui-floater-z-index": getZIndex(),
          "--qui-floater-left": `${floaterPosition.left}px`,
          "--qui-floater-top": `${floaterPosition.top}px`,
        }}
        class={classes.root}
      >
        <Slot />
      </div>
    );
  }
);
