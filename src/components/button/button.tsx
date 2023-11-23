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

export type ButtonIntrinsic = {
  inner?: QwikIntrinsicElements["div"];
  loaderWrapper?: QwikIntrinsicElements["div"];
  loader?: LoaderProps;
};

export type ButtonVariants = "filled" | "light" | "outline";

export type ButtonProps = QwikIntrinsicElements["button"] & {
  intrinsic?: ButtonIntrinsic;
  size?: QuiSize;
  color?: QuiColor;
  variant?: ButtonVariants;
  icon?: JSX.Element;
  compact?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
};

export const _Button = component$<ButtonProps>(
  ({
    intrinsic,
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
  }) => {
    const cb = classBuilder(styles);

    return (
      <button
        disabled={disabled || loading}
        type={type}
        {...inject(props, {
          style: [`--qui-button-size: ${getSize(size)}`, getColor(color)],
          class: cb("root", { variant, disabled, loading, compact, fullWidth }),
        })}
      >
        {icon ? icon : <></>}
        <div {...intrinsic?.inner}>
          <Slot />
        </div>
        {loading && (
          <div
            {...inject(intrinsic?.loaderWrapper, {
              class: styles["loader-wrapper"],
            })}
          >
            <Loader size={size} color="current" {...intrinsic?.loader} />
          </div>
        )}
      </button>
    );
  }
) as Component<ButtonProps> & ButtonCompound;

_Button.Group = ButtonGroup;

export const Button = _Button;
