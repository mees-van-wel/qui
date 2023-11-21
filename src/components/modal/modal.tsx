import {
  Slot,
  component$,
  useOnDocument,
  type Signal,
  $,
  useSignal,
  QwikIntrinsicElements,
} from "@builder.io/qwik";
import { Floater, FloaterProps } from "../floater";
import { type PaperProps, Paper } from "../paper";
import { type TitleProps, Title } from "../title";
import { IconX, QuiSize, getSize, inject } from "~/internal";
import styles from "./modal.module.scss";

export type ModalIntrinsic = {
  wrapper?: PaperProps;
  header?: QwikIntrinsicElements["div"];
  title?: TitleProps;
  closeIcon?: QwikIntrinsicElements["div"];
  inner?: QwikIntrinsicElements["div"];
};

export type ModalProps = FloaterProps & {
  intrinsic?: ModalIntrinsic;
  signal: Signal<boolean>;
  title: string;
  size?: QuiSize;
  noClose?: boolean;
};

export const Modal = component$<ModalProps>(
  ({ intrinsic, signal, title, size = "md", noClose, ...props }) => {
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
        {...inject(props, {
          style: `--qui-modal-size: ${getSize(size)}`,
          class: styles.root,
          onClick$: closeHandler,
          onAnimationEnd$: $((e: AnimationEvent) => {
            if (e.animationName === styles.bgCloseAnimation)
              signal.value = false;
          }),
        })}
      >
        <Paper
          noPadding
          fullWidth
          {...inject(intrinsic?.wrapper, {
            class: styles.wrapper,
            onClick$: $((event: MouseEvent) => {
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
        </Paper>
      </Floater>
    );
  }
);
