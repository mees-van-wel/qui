import {
  component$,
  useId,
  useStore,
  $,
  useComputed$,
  useVisibleTask$,
  type CSSProperties,
} from "@builder.io/qwik";
import {
  type OmittedInputWrapperProps,
  type InputWrapperClassNames,
  type InputWrapperStyles,
  InputWrapper,
  Input,
} from "~/internal";
import clsx from "clsx";
import { Group } from "../group";
import classes from "./pinInput.module.scss";

export type PinInputStyles = {
  wrapper?: InputWrapperStyles;
  input?: CSSProperties;
};

export type PinInputClassNames = {
  wrapper?: InputWrapperClassNames;
  input?: string;
};

export type PinInputProps = OmittedInputWrapperProps & {
  styles?: PinInputStyles;
  classNames?: PinInputClassNames;
  value?: string;
  autoFocus?: boolean;
  length?: number;
  name?: string;
  placeholder?: string;
  onChange$?: (value: string) => void;
};

export const PinInput = component$<PinInputProps>(
  ({
    length = 4,
    classNames,
    styles,
    label,
    description,
    error,
    required,
    disabled,
    value,
    autoFocus,
    onChange$,
    ...props
  }) => {
    const randomId = useId();
    const refs = useStore<Record<number, HTMLInputElement | undefined>>({});

    const arrayLoop = useComputed$(() => Array(length).fill(null));

    const focusHandler = $(() => {
      for (const [index] of arrayLoop.value.entries()) {
        const element = refs[index];
        if (element && !element.value) {
          element.focus();
          break;
        }
      }
    });

    const pasteHandler = $(async (event: ClipboardEvent) => {
      event.stopPropagation();
      event.preventDefault();

      const pastedData = await navigator.clipboard.readText();
      const formattedData = pastedData
        .replace(/\s/g, "")
        .substring(0, length)
        .split("");

      arrayLoop.value.forEach((_, index) => {
        const element = refs[index];
        if (!element) return;

        const value = formattedData[index];

        element.value = value && formattedData.length === length ? value : "";
      });

      refs[length - 1]?.focus();

      if (onChange$ && formattedData.length === length)
        onChange$(formattedData.join(""));
    });

    const changeHandler = $((element: HTMLInputElement, i: number) => {
      const value = element.value.substring(0, 1);
      element.value = value;

      if (i < length - 1 && value) refs[i + 1]?.focus();

      const totalValue = Object.values(refs).reduce(
        (string, element) => string + element?.value,
        ""
      );

      if (onChange$ && totalValue.length === length) onChange$(totalValue);
    });

    useVisibleTask$(() => {
      if (autoFocus)
        setTimeout(() => {
          refs[0]?.focus();
        }, 100);
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
        {/* @ts-ignore */}
        <Group onPaste$={pasteHandler}>
          {arrayLoop.value.map((_, index) => (
            <Input
              key={index}
              class={clsx(classes.input, classNames?.input)}
              style={styles?.input}
              error={!!error}
              disabled={disabled}
              type="text"
              inputMode="numeric"
              tabIndex={index === 0 ? undefined : -1}
              autoFocus={autoFocus && index === 0}
              onFocus$={(_, element) => {
                if (!element.value) focusHandler();
              }}
              ref={$((elementRef: any) => {
                refs[index] = elementRef;
              })}
              onInput$={(event: InputEvent, element) => {
                event.preventDefault();
                if (event.inputType === "insertFromPaste") return;
                changeHandler(element, index);
              }}
              onKeyDown$={(event, element) => {
                if (
                  (event as KeyboardEvent).code === "Backspace" &&
                  index > 0
                ) {
                  event.preventDefault();

                  if (element.value) element.value = "";

                  const previousInput = refs[index - 1]!;

                  previousInput.focus();
                  previousInput.setSelectionRange(
                    0,
                    previousInput.value.length
                  );
                }
              }}
              value={value ? value[index] : undefined}
              {...props}
            />
          ))}
        </Group>
      </InputWrapper>
    );
  }
);
