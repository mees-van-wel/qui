import {
  type Signal,
  component$,
  useId,
  useSignal,
  $,
  CSSProperties,
} from "@builder.io/qwik";
import {
  type InputWrapperStyles,
  type InputWrapperClassNames,
  type OmittedInputWrapperProps,
  InputWrapper,
  Input,
  CloseIcon,
} from "~/internal";

export type DateInputStyles = {
  wrapper?: InputWrapperStyles;
  input?: CSSProperties;
  closeIcon?: CSSProperties;
};

export type DateInputClassNames = {
  wrapper?: InputWrapperClassNames;
  input?: string;
  closeIcon?: string;
};

export type DateInputProps = Omit<OmittedInputWrapperProps, "required"> & {
  styles?: DateInputStyles;
  classNames?: DateInputClassNames;
  value?: Date | null;
  autoFocus?: boolean;
  name?: string;
  placeholder?: string;
  noIcon?: boolean;
  ref?: Signal<HTMLInputElement | undefined>;
  required?: boolean;
  onChange$?: (value: Date | null) => void;
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
    styles,
    classNames,
    label,
    description,
    error,
    required,
    disabled,
    ref,
    noIcon,
    value,
    onChange$,
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
        styles={styles?.wrapper}
        classNames={classNames?.wrapper}
        inputId={randomId}
        label={label}
        description={description}
        error={error}
        required={required}
        disabled={disabled}
      >
        <Input
          style={styles?.input}
          class={classNames?.input}
          ref={inputRef}
          id={randomId}
          error={!!error}
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
          {...props}
        />
        {!required && value && !noIcon && (
          <CloseIcon
            style={styles?.closeIcon}
            class={classNames?.closeIcon}
            onClick$={clearHandler}
          />
        )}
      </InputWrapper>
    );
  }
);
