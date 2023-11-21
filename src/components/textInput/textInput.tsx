import { type Signal, component$, useId } from "@builder.io/qwik";
import {
  type InputWrapperProps,
  type InputProps,
  InputWrapper,
  Input,
} from "~/internal";

export type TextInputIntrinsic = {
  input?: InputProps;
};

export type TextInputProps = InputWrapperProps & {
  intrinsic?: TextInputIntrinsic;
  value?: string;
  autoFocus?: boolean;
  name?: string;
  placeholder?: string;
  onChange$?: (value: string) => void;
  ref?: Signal<HTMLInputElement | undefined>;
};

export const TextInput = component$<TextInputProps>(
  ({
    intrinsic,
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
          {...intrinsic?.input}
        />
      </InputWrapper>
    );
  }
);
