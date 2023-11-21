import {
  component$,
  type Signal,
  useId,
  useContext,
  $,
  type QwikFocusEvent,
  type QwikChangeEvent,
} from "@builder.io/qwik";
import { UiContext } from "~/context";
import {
  InputWrapper,
  Input,
  type InputProps,
  type InputWrapperProps,
  inject,
} from "~/internal";

export type NumberInputIntrinsic = {
  input?: InputProps;
};

export type NumberInputProps = InputWrapperProps & {
  intrinsic?: NumberInputIntrinsic;
  value?: number | null;
  autoFocus?: boolean;
  decimal?: boolean;
  name?: string;
  placeholder?: string;
  onChange$?: (value: number | null) => void;
  ref?: Signal<HTMLInputElement | undefined>;
};

// TODO Pull from context
const DECIMAL_SEPARATOR = ".";

export const NumberInput = component$<NumberInputProps>(
  ({
    intrinsic,
    label,
    description,
    error,
    required,
    disabled,
    value,
    decimal,
    onChange$,
    ...props
  }) => {
    const randomId = useId();
    const { locale } = useContext(UiContext);

    const blurHandler = $(
      (_: QwikFocusEvent<HTMLInputElement>, element: HTMLInputElement) => {
        if (element.value && decimal && !isNaN(Number(element.value)))
          element.value = parseFloat(
            element.value.replace(",", ".")
          ).toLocaleString(locale, {
            minimumFractionDigits: 2,
          });
      }
    );

    const inputHandler = $(
      (_: QwikChangeEvent<HTMLInputElement>, element: HTMLInputElement) => {
        if (!element.value) {
          if (onChange$) onChange$(null);
          return;
        }

        let processedValue = element.value.replace(/[^0-9.,]/g, "");

        if (!decimal) processedValue = processedValue.replace(/[.,]/g, "");

        processedValue = processedValue.replace(/,/g, DECIMAL_SEPARATOR);

        if (processedValue.split(DECIMAL_SEPARATOR).length > 2)
          processedValue = processedValue.replace(DECIMAL_SEPARATOR, "");

        if (element.value !== processedValue)
          return (element.value = processedValue);

        element.value = processedValue;

        if (onChange$ && !isNaN(Number(processedValue)))
          onChange$(+processedValue);
      }
    );

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
          inputMode={decimal ? "decimal" : "numeric"}
          pattern={decimal ? "^d*.?d*$" : "^[0-9]*$"}
          type="text"
          value={value?.toString()}
          {...inject(intrinsic?.input, {
            onBlur$: blurHandler,
            onInput$: inputHandler,
          })}
        />
      </InputWrapper>
    );
  }
);
