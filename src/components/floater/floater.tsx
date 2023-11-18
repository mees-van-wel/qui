import {
  type Signal,
  Slot,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
  QwikIntrinsicElements,
  CSSProperties,
} from "@builder.io/qwik";
import {
  computePosition,
  flip,
  shift,
  offset,
  autoUpdate,
  type Placement,
} from "@floating-ui/dom";
import { getZIndex, inject } from "~/internal";
import styles from "./floater.module.scss";

export type FloaterProps = QwikIntrinsicElements["div"] & {
  relativeRef?: Signal<HTMLElement | undefined>;
  position?: CSSProperties["position"];
  placement?: Placement;
  ref?: Signal<HTMLElement | undefined>;
};

export const Floater = component$<FloaterProps>(
  ({
    relativeRef,
    position = "absolute",
    placement = "bottom",
    ref,
    ...props
  }) => {
    const refSignal = useSignal<HTMLElement>();
    const floaterRef = ref || refSignal;
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
          placement,
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
        updatePosition,
      );

      cleanup(() => {
        clean();
      });
    });

    return (
      <div
        ref={floaterRef}
        {...inject(props, {
          style: {
            "--qui-floater-position": position,
            "--qui-floater-opacity":
              !relativeRef || floaterPosition.top !== undefined ? 1 : 0,
            "--qui-floater-z-index": getZIndex(),
            ...(relativeRef
              ? {
                  left: `${floaterPosition.left}px`,
                  top: `${floaterPosition.top}px`,
                }
              : {
                  inset: 0,
                }),
          },
          class: styles.root,
        })}
      >
        <Slot />
      </div>
    );
  },
);
