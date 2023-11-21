import { Floater, type FloaterProps } from "../floater";
import {
  component$,
  Slot,
  $,
  useSignal,
  useOnDocument,
  QwikIntrinsicElements,
  type Signal,
} from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik/jsx-runtime";
import styles from "./popover.module.scss";
import { Paper, type PaperProps } from "../paper";
import { Placement } from "@floating-ui/dom";
import { inject } from "~/internal";
import { useUpdateTask } from "~/hooks";

export type PopoverIntrinsic = {
  trigger?: QwikIntrinsicElements["div"];
  floater?: FloaterProps;
  popover?: PaperProps;
};

export type PopoverProps = QwikIntrinsicElements["div"] & {
  intrinsic?: PopoverIntrinsic;
  trigger: JSX.Element;
  signal?: Signal<boolean>;
  position?: Placement;
  defaultOpened?: boolean;
  hover?: boolean;
};

export const Popover = component$<PopoverProps>(
  ({
    intrinsic,
    trigger,
    signal,
    hover,
    position = hover ? "top" : "bottom",
    defaultOpened,
    ...props
  }) => {
    const localTriggerRef = useSignal<HTMLElement>();
    const triggerRef = intrinsic?.trigger?.ref || localTriggerRef;
    const localContentRef = useSignal<HTMLElement>();
    const contentRef = intrinsic?.floater?.ref || localContentRef;
    const open = useSignal(!!defaultOpened);

    const openHandler = $(() => {
      if (!open.value) open.value = true;
    });

    const closeHandler = $(() => {
      if (open.value)
        contentRef.value?.classList.add(styles["floater--closed"]);
    });

    const togglerHandler = $(() => {
      open.value ? closeHandler() : openHandler();
    });

    useOnDocument(
      "keydown",
      $((e) => {
        if (!hover && (e as KeyboardEvent).code === "Escape") closeHandler();
      })
    );

    useOnDocument(
      "click",
      $((e) => {
        if (
          !hover &&
          // @ts-ignore Fix ref types
          !triggerRef.value?.contains(e.target as Node) &&
          !contentRef.value?.contains(e.target as Node)
        )
          closeHandler();
      })
    );

    useUpdateTask(
      $((track) => {
        track(() => signal?.value);
      }),
      $(() => {
        if (signal?.value) openHandler();
        else closeHandler();
      })
    );

    useUpdateTask(
      $((track) => {
        track(() => open.value);
      }),
      $(() => {
        if (signal && signal.value !== open.value) signal.value = open.value;
      })
    );

    return (
      <div {...inject(props, { class: styles.root })}>
        <div
          ref={triggerRef}
          {...inject(intrinsic?.trigger, {
            onClick$: $(() => {
              if (!hover) togglerHandler();
            }),
            onMouseOver$: $(() => {
              if (hover) openHandler();
            }),
            onMouseOut$: $((event: MouseEvent) => {
              if (
                hover &&
                // @ts-ignore Fix ref types
                !triggerRef.value?.contains(event.relatedTarget as Node)
              )
                closeHandler();
            }),
          })}
        >
          {trigger}
        </div>
        {open.value && (
          <Floater
            ref={contentRef}
            // @ts-ignore Fix ref types
            relativeRef={triggerRef}
            class={styles.floater}
            placement={position}
            {...inject(intrinsic?.floater, {
              onAnimationEnd$: $((event: AnimationEvent) => {
                if (event.animationName === styles.closeAnimation)
                  open.value = false;
              }),
            })}
          >
            <Paper variant="midground" {...intrinsic?.popover}>
              <Slot />
            </Paper>
          </Floater>
        )}
      </div>
    );
  }
);
