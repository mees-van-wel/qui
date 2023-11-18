import { type Signal, component$, useId } from "@builder.io/qwik";
import {
  type InputWrapperProps,
  type InputProps,
  InputWrapper,
  Input,
} from "~/internal";

export type TextInputSubProps = {
  input?: InputProps;
};

export type TextInputProps = InputWrapperProps & {
  subProps?: TextInputSubProps;
  value?: string;
  autoFocus?: boolean;
  name?: string;
  placeholder?: string;
  onChange$?: (value: string) => void;
  ref?: Signal<HTMLInputElement | undefined>;
};

export const TextInput = component$<TextInputProps>(
  ({
    subProps,
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
        label={label}
        description={description}
        error={error}
        required={required}
        disabled={disabled}
        {...props}
      >
        <Input
          id={randomId}
          invalid={!!error}
          disabled={disabled}
          type="text"
          onInput$={(_, element) => {
            if (onChange$) onChange$(element.value);
          }}
          {...subProps?.input}
        />
      </InputWrapper>
    );
  },
);
