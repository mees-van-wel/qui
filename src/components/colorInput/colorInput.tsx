import {
  type Signal,
  component$,
  useId,
  useSignal,
  useTask$,
  type CSSProperties,
} from "@builder.io/qwik";
import { Input } from "../../internal/input";
import { ColorSwatch } from "../colorSwatch";
import clsx from "clsx";
import {
  CloseIcon,
  InputWrapper,
  type InputWrapperClassNames,
  type InputWrapperStyles,
  type OmittedInputWrapperProps,
} from "~/internal";
import classes from "./colorInput.module.scss";

export type ColorInputStyles = {
  wrapper?: InputWrapperStyles;
  input?: CSSProperties;
  closeIcon?: CSSProperties;
};

export type ColorInputClassNames = {
  wrapper?: InputWrapperClassNames;
  input?: string;
  closeIcon?: string;
};

export type ColorInputProps = OmittedInputWrapperProps & {
  classNames?: ColorInputClassNames;
  styles?: ColorInputStyles;
  value?: string;
  autoFocus?: boolean;
  name?: string;
  placeholder?: string;
  onChange$?: (value: string) => void;
  ref?: Signal<HTMLInputElement | undefined>;
};

export const ColorInput = component$<ColorInputProps>(
  ({
    classNames,
    styles,
    label,
    description,
    error,
    required,
    disabled,
    value,
    onChange$,
    ...props
  }) => {
    const colorInputRef = useSignal<HTMLInputElement>();
    const textInputRef = useSignal<HTMLInputElement>();
    const randomId = useId();
    const internalValue = useSignal(value || "");

    useTask$(({ track }) => {
      track(() => value);

      if (internalValue.value !== value) internalValue.value = value || "";
    });

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
        <input
          class={classes["root__color-input"]}
          ref={colorInputRef}
          value={internalValue.value}
          type="color"
          onInput$={(_, element) => {
            internalValue.value = element.value;
            if (onChange$) onChange$(element.value);
          }}
          onChange$={() => {
            textInputRef.value?.blur();
          }}
        />
        <Input
          id={randomId}
          style={styles?.input}
          class={clsx(classes["root__text-input"], classNames?.input)}
          ref={textInputRef}
          value={internalValue.value}
          error={!!error}
          disabled={disabled}
          type="text"
          readOnly
          onFocus$={() => {
            colorInputRef.value?.showPicker();
          }}
          {...props}
        />
        <ColorSwatch
          class={classes["root__color-swatch"]}
          size="sm"
          color={internalValue.value || "transparent"}
        />
        {!required && internalValue.value && (
          <CloseIcon
            style={styles?.closeIcon}
            class={classNames?.closeIcon}
            onClick$={() => {
              internalValue.value = "";
            }}
          />
        )}
      </InputWrapper>
    );
  }
);
