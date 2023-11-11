import {
  type CSSProperties,
  component$,
  type Signal,
  useId,
  useContext,
} from "@builder.io/qwik";
import { UiContext } from "~/context";
import {
  type OmittedInputWrapperProps,
  type InputWrapperClassNames,
  type InputWrapperStyles,
  InputWrapper,
  Input,
} from "~/internal";

export type NumberInputStyles = {
  wrapper?: InputWrapperStyles;
  input?: CSSProperties;
};

export type NumberInputClassNames = {
  wrapper?: InputWrapperClassNames;
  input?: string;
};

export type NumberInputProps = OmittedInputWrapperProps & {
  styles?: NumberInputStyles;
  classNames?: NumberInputClassNames;
  value?: number | null;
  autoFocus?: boolean;
  decimal?: boolean;
  name?: string;
  placeholder?: string;
  onChange$?: (value: number | null) => void;
  ref?: Signal<HTMLInputElement | undefined>;
};

const DECIMAL_SEPARATOR = ".";

export const NumberInput = component$<NumberInputProps>(
  ({
    classNames,
    styles,
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
        <Input
          id={randomId}
          style={styles?.input}
          class={classNames?.input}
          error={!!error}
          disabled={disabled}
          inputMode={decimal ? "decimal" : "numeric"}
          pattern={decimal ? "^d*.?d*$" : "^[0-9]*$"}
          type="text"
          onBlur$={(_, element) => {
            if (element.value && decimal && !isNaN(Number(element.value)))
              element.value = parseFloat(
                element.value.replace(",", ".")
              ).toLocaleString(locale, {
                minimumFractionDigits: 2,
              });
          }}
          onInput$={(_, element) => {
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
          }}
          value={value?.toString()}
          {...props}
        />
      </InputWrapper>
    );
  }
);
