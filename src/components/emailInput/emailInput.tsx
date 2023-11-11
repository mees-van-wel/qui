import {
  type Signal,
  component$,
  useId,
  type CSSProperties,
} from "@builder.io/qwik";
import {
  type OmittedInputWrapperProps,
  type InputWrapperClassNames,
  type InputWrapperStyles,
  InputWrapper,
  Input,
} from "~/internal";

export type EmailInputStyles = {
  wrapper?: InputWrapperStyles;
  input?: CSSProperties;
};

export type EmailInputClassNames = {
  wrapper?: InputWrapperClassNames;
  input?: string;
};

export type EmailInputProps = OmittedInputWrapperProps & {
  styles?: EmailInputStyles;
  classNames?: EmailInputClassNames;
  value?: string;
  autoFocus?: boolean;
  autoComplete?: boolean;
  name?: string;
  placeholder?: string;
  onChange$?: (value: string) => void;
  ref?: Signal<HTMLInputElement | undefined>;
};

export const EmailInput = component$<EmailInputProps>(
  ({
    styles,
    classNames,
    label,
    description,
    error,
    required,
    disabled,
    autoComplete,
    onChange$,
    ...props
  }) => {
    const randomId = useId();

    return (
      <InputWrapper
        inputId={randomId}
        styles={styles?.wrapper}
        classNames={classNames?.wrapper}
        label={label}
        description={description}
        error={error}
        required={required}
        disabled={disabled}
      >
        <Input
          id={randomId}
          style={styles?.input}
          class={classNames?.input}
          error={!!error}
          disabled={disabled}
          autoComplete={autoComplete ? "username" : undefined}
          type="email"
          onInput$={(_, element) => {
            if (onChange$) onChange$(element.value.toLowerCase());
          }}
          {...props}
        />
      </InputWrapper>
    );
  }
);
