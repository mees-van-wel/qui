import {
  Slot,
  component$,
  type QwikIntrinsicElements,
  $,
} from "@builder.io/qwik";
import { Paper, type PaperProps } from "../paper";
import { Button, type ButtonProps } from "../button";
import { Title, type TitleProps } from "../title";
import { useLocalStorage } from "../../hooks";
import { Stack, StackProps } from "../stack";
import { IconEye, IconEyeOff, classBuilder, inject } from "~/internal";
import styles from "./sheet.module.scss";

export type SheetIntrinsic = {
  titleWrapper?: PaperProps;
  title?: TitleProps;
  button?: ButtonProps;
  icon?: QwikIntrinsicElements["div"];
  content?: PaperProps;
};

export type SheetProps = StackProps & {
  intrinsic?: SheetIntrinsic;
  title: string;
  showDefault?: boolean;
  glass?: boolean;
};

export const Sheet = component$<SheetProps>(
  ({ intrinsic, title, showDefault, glass, ...props }) => {
    const cb = classBuilder(styles);
    const { current: showSignal, isInitialized } = useLocalStorage<
      boolean | undefined
    >({
      key: `sheet:${title}`,
      defaultValue: showDefault,
    });

    if (!isInitialized.value) return null;

    const open = !!(showSignal.value === undefined || showSignal.value);

    return (
      <Stack
        align="flex-start"
        justify="flex-start"
        gap={0}
        {...inject(props, {
          class: cb("root", {
            open,
            closed: !open,
            default: showDefault !== undefined,
          }),
        })}
      >
        <Paper
          glass={glass}
          {...inject(intrinsic?.titleWrapper, {
            class: styles["title-wrapper"],
          })}
        >
          <Title
            order={4}
            {...inject(intrinsic?.title, {
              class: styles.title,
            })}
          >
            {title}
          </Title>
          {showDefault !== undefined && (
            <Button
              variant="light"
              {...inject(intrinsic?.button, {
                intrinsic: { inner: { class: styles["button-inner"] } },
                class: styles.button,
                onClick$: $(() => {
                  showSignal.value = !showSignal.value;
                }),
              })}
            >
              <IconEye
                {...inject(intrinsic?.icon, {
                  class: cb("icon", { open: true }),
                })}
              />
              <IconEyeOff
                {...inject(intrinsic?.icon, {
                  class: cb("icon", { close: true }),
                })}
              />
            </Button>
          )}
        </Paper>
        <Paper
          glass={glass}
          fullWidth
          {...inject(intrinsic?.content, {
            class: styles.content,
          })}
        >
          <div
            class={cb("content-inner", {
              open: open && showDefault === undefined,
            })}
          >
            <Slot />
          </div>
        </Paper>
      </Stack>
    );
  }
);
