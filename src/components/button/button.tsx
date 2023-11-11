import {
  component$,
  Slot,
  type CSSProperties,
  type QwikIntrinsicElements,
  type Component,
} from "@builder.io/qwik";
import { type QuiSize, getSize, QuiColor, getColor } from "~/internal";
import clsx from "clsx";
import classes from "./button.module.scss";
import type { JSX } from "@builder.io/qwik/jsx-runtime";
import { Loader } from "../loader";
import { ButtonGroup } from "./buttonGroup";

export type ButtonCompound = {
  Group: typeof ButtonGroup;
};

export type ButtonStyles = {
  root?: CSSProperties;
  inner?: CSSProperties;
  loaderWrapper?: CSSProperties;
  loader?: CSSProperties;
};

export type ButtonClassNames = {
  root?: string;
  inner?: string;
  loaderWrapper?: string;
  loader?: string;
};

export type ButtonVariants = "filled" | "light" | "outline";

export type ButtonProps = Omit<
  QwikIntrinsicElements["button"],
  "style" | "class" | "color"
> & {
  styles?: ButtonStyles;
  classNames?: ButtonClassNames;
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
    styles,
    classNames,
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
      style={{
        "--qui-button-size": getSize(size),
        ...getColor(color),
        ...styles?.root,
      }}
      class={clsx(
        classes.root,
        classes[`root--variant-${variant}`],
        {
          [classes["root--disabled"]]: disabled,
          [classes["root--loading"]]: loading,
          [classes["root--compact"]]: compact,
          [classes["root--full-width"]]: fullWidth,
        },
        classNames?.root
      )}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {icon ? icon : <></>}
      <div style={styles?.inner} class={classNames?.inner}>
        <Slot />
      </div>
      {loading && (
        <div
          style={styles?.loaderWrapper}
          class={clsx(
            classes["root__loader-wrapper"],
            classNames?.loaderWrapper
          )}
        >
          <Loader
            style={styles?.loader}
            class={classNames?.loader}
            size={size}
            color="current"
          />
        </div>
      )}
    </button>
  )
) as Component<ButtonProps> & ButtonCompound;

_Button.Group = ButtonGroup;

export const Button = _Button;
