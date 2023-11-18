import { Slot, component$, QwikIntrinsicElements } from "@builder.io/qwik";
import styles from "./inputWrapper.module.scss";
import { inject } from "../inject";

export type InputWrapperSubProps = {
  label?: QwikIntrinsicElements["label"];
  asterisk?: QwikIntrinsicElements["span"];
  description?: QwikIntrinsicElements["p"];
  inner?: QwikIntrinsicElements["div"];
  error?: QwikIntrinsicElements["p"];
};

export type InputWrapperProps = QwikIntrinsicElements["div"] & {
  subProps?: InputWrapperSubProps;
  inputId?: string;
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
    subProps,
    inputId,
    label,
    description,
    error,
    required,
    disabled,
    ...props
  }) => (
    <div {...props}>
      {label && (
        <label
          id={inputId && `${inputId}-label`}
          for={inputId}
          {...inject(subProps?.label, { class: styles.label })}
        >
          {label}
          {required && !disabled && (
            <span {...inject(subProps?.asterisk, { class: styles.asterisk })}>
              *
            </span>
          )}
        </label>
      )}
      {description && (
        <p
          id={inputId && `${inputId}-description`}
          {...inject(subProps?.description, { class: styles.description })}
        >
          {description}
        </p>
      )}
      <div {...inject(subProps?.inner, { class: styles.inner })}>
        <Slot />
      </div>
      {error && !disabled && (
        <p
          id={inputId && `${inputId}-error`}
          role="alert"
          {...inject(subProps?.error, { class: styles.error })}
        >
          {error}
        </p>
      )}
    </div>
  ),
);
