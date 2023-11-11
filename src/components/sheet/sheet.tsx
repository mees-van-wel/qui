import { type CSSProperties, Slot, component$ } from "@builder.io/qwik";
import { Paper } from "../paper";
import { Button, type ButtonClassNames, type ButtonStyles } from "../button";
import { Title } from "../title";
import { useLocalStorage } from "../../hooks";
import { Stack } from "../stack";
import clsx from "clsx";
import { IconEye, IconEyeOff } from "~/internal";
import classes from "./sheet.module.scss";

export type SheetStyles = {
  root?: CSSProperties;
  titleWrapper?: CSSProperties;
  title?: CSSProperties;
  button?: ButtonStyles;
  icon?: CSSProperties;
  content?: CSSProperties;
};

export type SheetClassNames = {
  root?: string;
  titleWrapper?: string;
  title?: string;
  button?: ButtonClassNames;
  icon?: string;
  content?: string;
};

export type SheetProps = {
  styles?: SheetStyles;
  classNames?: SheetClassNames;
  title: string;
  showDefault?: boolean;
  glass?: boolean;
};

export const Sheet = component$<SheetProps>(
  ({ classNames, styles, title, showDefault, glass }) => {
    const { current: showSignal, isInitialized } = useLocalStorage<
      boolean | undefined
    >({
      key: `sheet:${title}`,
      defaultValue: showDefault,
    });

    if (!isInitialized.value) return null;

    const isOpen = !!(showSignal.value === undefined || showSignal.value);

    return (
      <Stack
        style={styles?.root}
        class={clsx(
          classes.root,
          {
            [classes["root--open"]]: isOpen,
            [classes["root--closed"]]: !isOpen,
            [classes["root--default"]]: showDefault !== undefined,
          },
          classNames?.root
        )}
        align="flex-start"
        justify="flex-start"
        gap={0}
      >
        <Paper
          style={styles?.titleWrapper}
          class={clsx(classes["root__title-wrapper"], classNames?.titleWrapper)}
          glass={glass}
        >
          <Title
            style={styles?.title}
            class={clsx(classes["root__title"], classNames?.title)}
            order={4}
          >
            {title}
          </Title>
          {showDefault !== undefined && (
            <Button
              styles={styles?.button}
              classNames={{
                root: clsx(classes["root__button"], classNames?.button?.root),
                inner: clsx(
                  classes["root__button__inner"],
                  classNames?.button?.inner
                ),
                ...classNames?.button,
              }}
              variant="light"
              onClick$={() => {
                showSignal.value = !showSignal.value;
              }}
            >
              <IconEye
                style={styles?.icon}
                class={clsx(
                  classes["root__icon"],
                  classes["root__icon-open"],
                  classNames?.icon
                )}
              />
              <IconEyeOff
                style={styles?.icon}
                class={clsx(
                  classes["root__icon"],
                  classes["root__icon-close"],
                  classNames?.icon
                )}
              />
            </Button>
          )}
        </Paper>
        <Paper
          style={styles?.content}
          class={clsx(classes["root__content"], classNames?.content)}
          glass={glass}
          fullWidth
        >
          <div
            class={clsx("overflow-hidden", {
              "overflow-auto": isOpen && showDefault === undefined,
            })}
          >
            <Slot />
          </div>
        </Paper>
      </Stack>
    );
  }
);
