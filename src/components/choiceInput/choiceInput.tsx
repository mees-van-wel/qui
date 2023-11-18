import {
  QwikIntrinsicElements,
  component$,
  useContextProvider,
  useId,
  useStore,
} from "@builder.io/qwik";
import { InputWrapper, InputWrapperProps, inject } from "~/internal";
import { Group } from "../group";
import { Stack } from "../stack";
import { ChoiceContext } from "./choiceInputContext";
import { ChoiceOption, ChoiceValue } from "./types";
import { Checkbox } from "./checkbox";
import styles from "./choiceInput.module.scss";
import { Radio } from "./radio";

export type ChoiceInputSubProps = {
  wrapper?: QwikIntrinsicElements["div"];
};

export type ChoiceInputProps = InputWrapperProps & {
  subProps?: ChoiceInputSubProps;
  data: ChoiceOption[];
  value?: (ChoiceValue | null) | ChoiceValue[];
  onChange$?: (value: ChoiceValue | ChoiceValue[]) => void;
  horizontal?: boolean;
  multiple?: boolean;
};

// & (
//     | {
//         multiple?: false;
//         value?: ChoiceValue | null;
//         onChange$?: (value: ChoiceValue) => void;
//       }
//     | {
//         multiple: true;
//         value?: ChoiceValue[];
//         onChange$?: (value: ChoiceValue[]) => void;
//       }
//   );

// TODO Generic ChoiceValue typings
export const ChoiceInput = component$<ChoiceInputProps>(
  ({
    subProps,
    horizontal,
    multiple,
    data: options,
    value,
    label,
    onChange$,
    description,
    error,
    required,
    disabled,
  }) => {
    const Wrapper = horizontal ? Group : Stack;
    const Input = multiple ? Checkbox : Radio;
    const randomId = useId();

    const choiceStore = useStore<ChoiceContext>({
      id: randomId,
      disabled,
    });

    useContextProvider(ChoiceContext, choiceStore);

    return (
      <InputWrapper
        inputId={randomId}
        label={label}
        description={description}
        error={error}
        required={required}
        disabled={disabled}
      >
        <Wrapper
          id={randomId}
          {...inject(subProps?.wrapper, {
            class: styles.wrapper,
          })}
        >
          {options.map((option) => (
            <Input
              invalid={!!error && !disabled}
              key={option.value}
              option={option}
              value={value}
              onChange$={onChange$}
            />
          ))}
        </Wrapper>
      </InputWrapper>
    );
  },
);
