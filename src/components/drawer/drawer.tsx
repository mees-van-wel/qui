import {
  type Signal,
  Slot,
  component$,
  $,
  useOnDocument,
  useSignal,
  type QwikIntrinsicElements,
  type QwikMouseEvent,
} from "@builder.io/qwik";
import { Floater, FloaterProps } from "../floater";
import { IconX, inject } from "~/internal";
import styles from "./drawer.module.scss";
import { Title, TitleProps } from "../title";

export type DrawerIntrinsic = {
  wrapper?: QwikIntrinsicElements["div"];
  header?: QwikIntrinsicElements["div"];
  title?: TitleProps;
  closeIcon?: QwikIntrinsicElements["div"];
  inner?: QwikIntrinsicElements["div"];
};

export type DrawerProps = FloaterProps & {
  intrinsic?: DrawerIntrinsic;
  signal: Signal<boolean>;
  title: string;
  noClose?: boolean;
};

export const Drawer = component$<DrawerProps>(
  ({ intrinsic, signal, title, noClose, ...props }) => {
    const ref = useSignal<HTMLElement>();

    const closeHandler = $(() => {
      if (!noClose && signal.value)
        ref.value?.classList.add(styles["root--closed"]);
    });

    useOnDocument(
      "keydown",
      $((e) => {
        if ((e as KeyboardEvent).code === "Escape") closeHandler();
      })
    );

    if (!signal.value) return null;

    return (
      <Floater
        ref={ref}
        position="fixed"
        onClick$={closeHandler}
        {...inject(props, {
          class: styles.root,
          onAnimationEnd$: $((e: AnimationEvent) => {
            if (e.animationName === styles.bgCloseAnimation)
              signal.value = false;
          }),
        })}
      >
        <div
          {...inject(intrinsic?.wrapper, {
            class: styles.wrapper,
            onClick$: $((event: QwikMouseEvent) => {
              event.stopPropagation();
            }),
          })}
        >
          <div {...inject(intrinsic?.header, { class: styles.header })}>
            <Title order={3} {...intrinsic?.title}>
              {title}
            </Title>
            {!noClose && (
              <IconX
                {...inject(intrinsic?.closeIcon, {
                  class: styles.closeIcon,
                  onClick$: closeHandler,
                })}
              />
            )}
          </div>
          <div {...inject(intrinsic?.inner, { class: styles.inner })}>
            <Slot />
          </div>
        </div>
      </Floater>
    );
  }
);
