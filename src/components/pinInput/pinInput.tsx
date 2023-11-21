import {
  component$,
  useId,
  useStore,
  $,
  useComputed$,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  InputWrapper,
  Input,
  type InputWrapperProps,
  type InputProps,
  inject,
} from "~/internal";
import { Group } from "../group";
import styles from "./pinInput.module.scss";

export type PinInputIntrinsic = {
  input?: InputProps;
};

export type PinInputProps = InputWrapperProps & {
  intrinsic?: PinInputIntrinsic;
  length?: number;
  value?: string;
  autoFocus?: boolean;
  name?: string;
  placeholder?: string;
  onChange$?: (value: string) => void;
};

export const PinInput = component$<PinInputProps>(
  ({
    intrinsic,
    length = 4,
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

    const pasteHandler = $(async () => {
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
        label={label}
        description={description}
        error={error}
        required={required}
        disabled={disabled}
        {...props}
      >
        <Group onPaste$={pasteHandler}>
          {arrayLoop.value.map((_, index) => (
            <Input
              key={index}
              invalid={!!error}
              disabled={disabled}
              type="text"
              inputMode="numeric"
              tabIndex={index === 0 ? undefined : -1}
              autoFocus={autoFocus && index === 0}
              value={value ? value[index] : undefined}
              ref={$((elementRef: any) => {
                refs[index] = elementRef;
              })}
              {...inject(intrinsic?.input, {
                class: styles.input,
                // TODO auto poputlate with typings from props
                onFocus$: $((_: Event, element: HTMLInputElement) => {
                  if (!element.value) focusHandler();
                }),
                onInput$: $((event: InputEvent, element: HTMLInputElement) => {
                  event.preventDefault();
                  if (event.inputType === "insertFromPaste") return;
                  changeHandler(element, index);
                }),
                onKeyDown$: $(
                  (event: KeyboardEvent, element: HTMLInputElement) => {
                    if (event.code === "Backspace" && index > 0) {
                      event.preventDefault();

                      if (element.value) element.value = "";

                      const previousInput = refs[index - 1]!;

                      previousInput.focus();
                      previousInput.setSelectionRange(
                        0,
                        previousInput.value.length
                      );
                    }
                  }
                ),
              })}
            />
          ))}
        </Group>
      </InputWrapper>
    );
  }
);
