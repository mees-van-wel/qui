import { type Signal, component$, useId, $, useSignal } from "@builder.io/qwik";
import {
  CloseIcon,
  Input,
  InputWrapper,
  type InputWrapperProps,
  type InputProps,
  type CloseIconProps,
  inject,
} from "~/internal";

export type TimeInputSubProps = {
  input?: InputProps;
  closeIcon?: CloseIconProps;
};

export type TimeInputProps = InputWrapperProps & {
  subProps?: TimeInputSubProps;
  value?: string;
  autoFocus?: boolean;
  name?: string;
  placeholder?: string;
  noIcon?: boolean;
  onChange$?: (value: string) => void;
  ref?: Signal<HTMLInputElement | undefined>;
};

export const TimeInput = component$<TimeInputProps>(
  ({
    subProps,
    label,
    description,
    error,
    required,
    noIcon,
    disabled,
    value,
    onChange$,
    ref,
    ...props
  }) => {
    const localInputRef = useSignal<HTMLInputElement>();
    const inputRef = ref || localInputRef;
    const randomId = useId();

    const clearHandler = $(() => {
      if (!inputRef.value || required) return;
      inputRef.value.value = "";
      if (onChange$) onChange$("");
    });

    const focusHandler = $(() => {
      if (!inputRef.value) return;
      inputRef.value.showPicker();
    });

    const changeHandler = $(() => {
      if (!inputRef.value) return;

      inputRef.value.blur();

      if (inputRef.value.value) {
        if (onChange$) onChange$(inputRef.value.value);
      } else if (required && value) inputRef.value.value = value;
      else clearHandler();
    });

    return (
      <InputWrapper
        inputId={randomId}
        label={label}
        description={description}
        error={error}
        required={required}
        disabled={disabled}
        {...props}
      >
        <Input
          ref={inputRef}
          id={randomId}
          invalid={!!error}
          disabled={disabled}
          type={disabled && !value ? "text" : "time"}
          value={value}
          {...inject(subProps?.input, {
            onFocus$: focusHandler,
            onChange$: changeHandler,
          })}
        />
        {!required && value && !noIcon && (
          <CloseIcon
            {...inject(subProps?.closeIcon, {
              onClick$: clearHandler,
            })}
          />
        )}
      </InputWrapper>
    );
  }
);
