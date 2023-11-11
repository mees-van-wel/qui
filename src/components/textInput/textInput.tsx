import {
  type Signal,
  component$,
  useId,
  CSSProperties,
} from "@builder.io/qwik";
import { Input } from "../../internal/input";
import {
  InputWrapper,
  type InputWrapperClassNames,
  type InputWrapperStyles,
  type OmittedInputWrapperProps,
} from "~/internal";

export type TextInputStyles = {
  wrapper?: InputWrapperStyles;
  input?: CSSProperties;
};

export type TextInputClassNames = {
  wrapper?: InputWrapperClassNames;
  input?: string;
};

export type TextInputProps = OmittedInputWrapperProps & {
  styles?: TextInputStyles;
  classNames?: TextInputClassNames;
  value?: string;
  autoFocus?: boolean;
  name?: string;
  placeholder?: string;
  onChange$?: (value: string) => void;
  ref?: Signal<HTMLInputElement | undefined>;
};

export const TextInput = component$<TextInputProps>(
  ({
    styles,
    classNames,
    label,
    description,
    error,
    required,
    disabled,
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
          type="text"
          onInput$={(_, element) => {
            if (onChange$) onChange$(element.value);
          }}
          {...props}
        />
      </InputWrapper>
    );
  }
);
