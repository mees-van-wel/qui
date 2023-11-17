import {
  type Signal,
  type CSSProperties,
  component$,
  useId,
} from "@builder.io/qwik";
import {
  type InputWrapperClassNames,
  type OmittedInputWrapperProps,
  type InputWrapperSubProps,
  InputWrapper,
} from "~/internal";
import commonStyles from "~/common.module.scss";
import clsx from "clsx";

export type TextareaStyles = {
  wrapper?: InputWrapperSubProps;
  input?: CSSProperties;
};

export type TextareaClasses = {
  wrapper?: InputWrapperClassNames;
  input?: string;
};

export type TextareaProps = OmittedInputWrapperProps & {
  styles?: TextareaStyles;
  classNames?: TextareaClasses;
  value?: string;
  autoFocus?: boolean;
  name?: string;
  rows?: number;
  onChange$?: (value: string) => void;
  ref?: Signal<HTMLInputElement | undefined>;
};

export const Textarea = component$<TextareaProps>(
  ({
    styles,
    classNames,
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
        styles={styles?.wrapper}
        classNames={classNames?.wrapper}
        inputId={randomId}
        label={label}
        description={description}
        error={error}
        required={required}
        disabled={disabled}
      >
        <textarea
          id={randomId}
          style={styles?.input}
          class={clsx(commonStyles.input, {
            [commonStyles["input--error"]]: error && !disabled,
          })}
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
          {...props}
        />
      </InputWrapper>
    );
  }
);
