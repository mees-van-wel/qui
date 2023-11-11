import { type CSSProperties, Slot, component$ } from "@builder.io/qwik";
import clsx from "clsx";
import classes from "./inputWrapper.module.scss";

export type InputWrapperStyles = {
  root?: CSSProperties;
  label?: CSSProperties;
  asterisk?: CSSProperties;
  description?: CSSProperties;
  inner?: CSSProperties;
  error?: CSSProperties;
};

export type InputWrapperClassNames = {
  root?: string;
  label?: string;
  asterisk?: string;
  description?: string;
  inner?: string;
  error?: string;
};

// export type InputWrapperOverwriteProps = {
//   root?: QwikIntrinsicElements["div"];
//   label?: QwikIntrinsicElements["label"];
//   asterisk?: QwikIntrinsicElements["span"];
//   description?: QwikIntrinsicElements["p"];
//   inner?: QwikIntrinsicElements["div"];
//   error?: QwikIntrinsicElements["p"];
// };

export type InputWrapperProps = {
  // overwrite?: InputWrapperOverwriteProps;
  styles?: InputWrapperStyles;
  classNames?: InputWrapperClassNames;
  inputId: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

export type OmittedInputWrapperProps = Omit<
  InputWrapperProps,
  "inputId" | "classes" | "styles"
>;

export const InputWrapper = component$<InputWrapperProps>(
  ({
    classNames,
    styles,
    disabled,
    label,
    inputId,
    required,
    description,
    error,
  }) => (
    <div class={classNames?.root} style={styles?.root}>
      {label && (
        <label
          style={styles?.label}
          class={clsx(classes.label, classNames?.label)}
          id={inputId && `${inputId}-label`}
          for={inputId}
        >
          {label}
          {required && !disabled && (
            <span
              class={clsx(classes.asterisk, classNames?.asterisk)}
              style={styles?.asterisk}
            >
              *
            </span>
          )}
        </label>
      )}
      {description && (
        <p
          style={styles?.description}
          class={clsx(classes.description, classNames?.description)}
          id={inputId && `${inputId}-description`}
        >
          {description}
        </p>
      )}
      <div class={clsx(classes.inner, classNames?.inner)} style={styles?.inner}>
        <Slot />
      </div>
      {error && !disabled && (
        <p
          style={styles?.error}
          class={clsx(classes.error, classNames?.error)}
          id={inputId && `${inputId}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
);
