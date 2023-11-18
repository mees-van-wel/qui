import {
  type Signal,
  component$,
  useId,
  QwikIntrinsicElements,
} from "@builder.io/qwik";
import {
  InputWrapper,
  classBuilder,
  type InputWrapperProps,
  inject,
} from "~/internal";
import commonStyles from "~/common.module.scss";

export type TextareaSubProps = {
  input?: QwikIntrinsicElements["textarea"];
};

export type TextareaProps = InputWrapperProps & {
  subProps?: TextareaSubProps;
  value?: string;
  autoFocus?: boolean;
  name?: string;
  rows?: number;
  onChange$?: (value: string) => void;
  ref?: Signal<HTMLInputElement | undefined>;
};

const cb = classBuilder(commonStyles);

export const Textarea = component$<TextareaProps>(
  ({
    subProps,
    label,
    description,
    error,
    required,
    disabled,
    rows,
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
        <textarea
          id={randomId}
          disabled={disabled}
          autoComplete="off"
          aria-invalid={!!error}
          aria-autocomplete="both"
          aria-haspopup={false}
          rows={rows}
          onInput$={(_, element) => {
            element.style.height = "auto";
            element.style.height = `${element.scrollHeight + 2}px`;
            if (onChange$) onChange$(element.value);
          }}
          {...inject(subProps?.input, {
            class: cb("input", { error: !!error && !disabled }),
          })}
        />
      </InputWrapper>
    );
  },
);