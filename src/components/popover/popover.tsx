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

export type PopoverSubProps = {
  trigger?: QwikIntrinsicElements["div"];
  floater?: FloaterProps;
  popover?: PaperProps;
};

export type PopoverProps = QwikIntrinsicElements["div"] & {
  subProps?: PopoverSubProps;
  trigger: JSX.Element;
  signal?: Signal<boolean>;
  position?: Placement;
  defaultOpened?: boolean;
  hover?: boolean;
};

export const Popover = component$<PopoverProps>(
  ({
    subProps,
    trigger,
    signal,
    hover,
    position = hover ? "top" : "bottom",
    defaultOpened,
    ...props
  }) => {
    const localTriggerRef = useSignal<HTMLElement>();
    const triggerRef = subProps?.trigger?.ref || localTriggerRef;
    const localContentRef = useSignal<HTMLElement>();
    const contentRef = subProps?.floater?.ref || localContentRef;
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
          {...inject(subProps?.trigger, {
            onClick$: $(() => {
              if (!hover) togglerHandler();
            }),
            onMouseOver$: $(() => {
              if (hover) openHandler();
            }),
            onMouseOut$: $((event) => {
              if (
                hover &&
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
            relativeRef={triggerRef}
            class={styles.floater}
            placement={position}
            {...inject(subProps?.floater, {
              onAnimationEnd$: $((event) => {
                if (event.animationName === styles.closeAnimation)
                  open.value = false;
              }),
            })}
          >
            <Paper variant="midground" {...subProps?.popover}>
              <Slot />
            </Paper>
          </Floater>
        )}
      </div>
    );
  }
);
