import {
  component$,
  useId,
  useSignal,
  useTask$,
  QwikIntrinsicElements,
  $,
  type Signal,
} from "@builder.io/qwik";
import { ColorSwatch, type ColorSwatchProps } from "../colorSwatch";
import {
  CloseIcon,
  CloseIconProps,
  InputWrapper,
  IconColorPicker,
  Input,
  type InputProps,
  type InputWrapperProps,
  inject,
} from "~/internal";
import styles from "./colorInput.module.scss";

export type ColorInputSubProps = {
  picker?: QwikIntrinsicElements["input"];
  input?: InputProps;
  swatch?: ColorSwatchProps;
  closeIcon?: CloseIconProps;
};

export type ColorInputProps = InputWrapperProps & {
  subProps?: ColorInputSubProps;
  value?: string;
  autoFocus?: boolean;
  name?: string;
  placeholder?: string;
  onChange$?: (value: string) => void;
  ref?: Signal<HTMLInputElement | undefined>;
};

export const ColorInput = component$<ColorInputProps>(
  ({
    subProps,
    label,
    description,
    error,
    required,
    disabled,
    value,
    onChange$,
    ref,
    ...props
  }) => {
    const randomId = useId();
    const internalValue = useSignal(value?.replace("#", "") || "");
    const colorInputRef = useSignal<HTMLInputElement>();
    const localInputRef = useSignal<HTMLInputElement>();
    const textInputRef = ref || localInputRef;

    useTask$(({ track }) => {
      track(() => value);

      if (internalValue.value !== value?.replace("#", ""))
        internalValue.value = value?.replace("#", "") || "";
    });

    const inputHandler = $((_: InputEvent, element: HTMLInputElement) => {
      internalValue.value = element.value.replace("#", "");
      if (onChange$) onChange$(element.value);
    });

    const changeHandler = $(() => {
      textInputRef.value?.blur();
    });

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
        <input
          ref={colorInputRef}
          value={internalValue.value}
          type="color"
          {...inject(subProps?.picker, {
            class: styles["color-input"],
            onInput$: inputHandler,
            onChange$: changeHandler,
          })}
        />
        <Input
          id={randomId}
          ref={textInputRef}
          value={`#${internalValue.value}`}
          invalid={!!error}
          disabled={disabled}
          type="text"
          minLength={4}
          maxLength={7}
          onInput$={(_, element) => {
            const value = element.value.replace("#", "");
            internalValue.value = value;
            if (!value) element.value = "#";
          }}
          {...inject(subProps?.input, { class: styles["text-input"] })}
        />
        {internalValue.value ? (
          <ColorSwatch
            size="sm"
            onClick$={() => {
              colorInputRef.value?.showPicker();
            }}
            {...inject(subProps?.swatch, {
              class: styles["color-picker"],
              color: `#${internalValue.value}`,
            })}
          />
        ) : (
          <IconColorPicker
            onClick$={() => {
              colorInputRef.value?.showPicker();
            }}
            class={styles["color-picker"]}
          />
        )}

        {!required && internalValue.value && (
          <CloseIcon
            {...inject(subProps?.closeIcon, {
              onClick$: $(() => {
                internalValue.value = "";
              }),
            })}
          />
        )}
      </InputWrapper>
    );
  }
);
