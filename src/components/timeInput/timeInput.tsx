import {
  type Signal,
  component$,
  useId,
  $,
  useSignal,
  type CSSProperties,
} from "@builder.io/qwik";
import {
  CloseIcon,
  Input,
  InputWrapper,
  type InputWrapperClassNames,
  type InputWrapperStyles,
  type OmittedInputWrapperProps,
} from "~/internal";

export type TimeInputStyles = {
  wrapper?: InputWrapperStyles;
  input?: CSSProperties;
  closeIcon?: CSSProperties;
};

export type TimeInputClassNames = {
  wrapper?: InputWrapperClassNames;
  input?: string;
  closeIcon?: string;
};

export type TimeInputProps = OmittedInputWrapperProps & {
  styles?: TimeInputStyles;
  classNames?: TimeInputClassNames;
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
    styles,
    classNames,
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

    return (
      <InputWrapper
        inputId={randomId}
        classNames={classNames?.wrapper}
        styles={styles?.wrapper}
        label={label}
        description={description}
        error={error}
        required={required}
        disabled={disabled}
      >
        <Input
          ref={inputRef}
          id={randomId}
          class={classNames?.input}
          style={styles?.input}
          error={!!error}
          disabled={disabled}
          type={disabled && !value ? "text" : "time"}
          onFocus$={() => {
            if (!inputRef.value) return;
            inputRef.value.showPicker();
          }}
          value={value}
          onChange$={() => {
            if (!inputRef.value) return;

            inputRef.value.blur();

            if (inputRef.value.value) {
              if (onChange$) onChange$(inputRef.value.value);
            } else if (required && value) inputRef.value.value = value;
            else clearHandler();
          }}
          {...props}
        />
        {!required && value && !noIcon && (
          <CloseIcon
            class={classNames?.closeIcon}
            style={styles?.closeIcon}
            onClick$={clearHandler}
          />
        )}
      </InputWrapper>
    );
  }
);
