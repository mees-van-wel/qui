import { type Signal, component$, useId, useSignal, $ } from "@builder.io/qwik";
import {
  type InputWrapperProps,
  type CloseIconProps,
  type InputProps,
  InputWrapper,
  Input,
  CloseIcon,
  inject,
} from "~/internal";

export type DateInputSubProps = {
  input?: InputProps;
  closeIcon?: CloseIconProps;
};

export type DateInputProps = InputWrapperProps & {
  subProps?: DateInputSubProps;
  value?: Date | null;
  autoFocus?: boolean;
  name?: string;
  placeholder?: string;
  onChange$?: (value: Date | null) => void;
  ref?: Signal<HTMLInputElement | undefined>;
  noIcon?: boolean;
};
// TODO Conditional function prop type https://github.com/BuilderIO/qwik/issues/3719
// & (
//     | {
//         required?: false;
//         onChange$?: (value: Date | null) => void;
//       }
//     | {
//         required: true;
//         onChange$?: (value: Date) => void;
//       }
//   );

export const dateToDateString = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;

export const DateInput = component$<DateInputProps>(
  ({
    subProps,
    label,
    description,
    error,
    required,
    disabled,
    value,
    onChange$,
    ref,
    noIcon,
    ...props
  }) => {
    const randomId = useId();
    const localInputRef = useSignal<HTMLInputElement>();
    const inputRef = ref || localInputRef;

    const changeHandler = $(() => {
      if (!inputRef.value) return;
      inputRef.value.blur();
      if (inputRef.value.value) {
        if (onChange$) onChange$(new Date(inputRef.value.value));
      } else if (required && value)
        inputRef.value.value = dateToDateString(new Date(value));
      else clearHandler();
    });

    const clearHandler = $(() => {
      if (!inputRef.value || required) return;
      inputRef.value.value = "";
      if (onChange$) onChange$(null);
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
          type={disabled && !value ? "text" : "date"}
          onFocus$={() => {
            if (!inputRef.value) return;
            inputRef.value.showPicker();
          }}
          value={
            value === null
              ? ""
              : value
              ? dateToDateString(new Date(value))
              : undefined
          }
          onChange$={changeHandler}
          {...subProps?.input}
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
