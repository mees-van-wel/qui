import {
  component$,
  Slot,
  type QwikIntrinsicElements,
  type Component,
} from "@builder.io/qwik";
import {
  type QuiSize,
  getSize,
  QuiColor,
  getColor,
  inject,
  classBuilder,
} from "~/internal";
import styles from "./button.module.scss";
import type { JSX } from "@builder.io/qwik/jsx-runtime";
import { Loader, LoaderProps } from "../loader";
import { ButtonGroup } from "./buttonGroup";

export type ButtonCompound = {
  Group: typeof ButtonGroup;
};

export type ButtonSubProps = {
  inner?: QwikIntrinsicElements["div"];
  loaderWrapper?: QwikIntrinsicElements["div"];
  loader?: LoaderProps;
};

export type ButtonVariants = "filled" | "light" | "outline";

export type ButtonProps = QwikIntrinsicElements["button"] & {
  subProps?: ButtonSubProps;
  size?: QuiSize;
  color?: QuiColor;
  variant?: ButtonVariants;
  icon?: JSX.Element;
  compact?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
};

const cb = classBuilder(styles);

export const _Button = component$<ButtonProps>(
  ({
    subProps,
    size = "md",
    color,
    variant = "filled",
    icon,
    disabled,
    loading,
    compact,
    fullWidth,
    type = "button",
    ...props
  }) => (
    <button
      disabled={disabled || loading}
      type={type}
      {...inject(props, {
        style: [`--qui-button-size: ${getSize(size)}`, getColor(color)],
        class: cb("root", { variant, disabled, loading, compact, fullWidth }),
      })}
    >
      {icon ? icon : <></>}
      <div {...subProps?.inner}>
        <Slot />
      </div>
      {loading && (
        <div
          {...inject(subProps?.loaderWrapper, {
            class: styles["loader-wrapper"],
          })}
        >
          <Loader size={size} color="current" {...subProps?.loader} />
        </div>
      )}
    </button>
  ),
) as Component<ButtonProps> & ButtonCompound;

_Button.Group = ButtonGroup;

export const Button = _Button;
