import { type Signal, component$, useId, $ } from "@builder.io/qwik";
import {
  type InputWrapperProps,
  type InputProps,
  InputWrapper,
  Input,
  inject,
} from "~/internal";

export type EmailInputIntrinsic = {
  input?: InputProps;
};

export type EmailInputProps = InputWrapperProps & {
  intrinsic?: EmailInputIntrinsic;
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
    intrinsic,
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
          autoComplete={autoComplete ? "username" : undefined}
          type="email"
          {...inject(intrinsic?.input, {
            onInput$: $((_: Event, element: HTMLInputElement) => {
              if (onChange$) onChange$(element.value.toLowerCase());
            }),
          })}
        />
      </InputWrapper>
    );
  }
);
