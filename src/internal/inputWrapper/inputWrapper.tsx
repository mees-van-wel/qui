import { Slot, component$, QwikIntrinsicElements } from "@builder.io/qwik";
import styles from "./inputWrapper.module.scss";
import { inject } from "../inject";

export type InputWrapperIntrinsic = {
  label?: QwikIntrinsicElements["label"];
  asterisk?: QwikIntrinsicElements["span"];
  description?: QwikIntrinsicElements["p"];
  inner?: QwikIntrinsicElements["div"];
  error?: QwikIntrinsicElements["p"];
};

export type InputWrapperProps = QwikIntrinsicElements["div"] & {
  intrinsic?: InputWrapperIntrinsic;
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
    intrinsic,
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
          {...inject(intrinsic?.label, { class: styles.label })}
        >
          {label}
          {required && !disabled && (
            <span {...inject(intrinsic?.asterisk, { class: styles.asterisk })}>
              *
            </span>
          )}
        </label>
      )}
      {description && (
        <p
          id={inputId && `${inputId}-description`}
          {...inject(intrinsic?.description, { class: styles.description })}
        >
          {description}
        </p>
      )}
      <div {...inject(intrinsic?.inner, { class: styles.inner })}>
        <Slot />
      </div>
      {error && !disabled && (
        <p
          id={inputId && `${inputId}-error`}
          role="alert"
          {...inject(intrinsic?.error, { class: styles.error })}
        >
          {error}
        </p>
      )}
    </div>
  )
);
