import {
  component$,
  useSignal,
  $,
  useComputed$,
  useId,
  useVisibleTask$,
  useContextProvider,
  Signal,
  useTask$,
  type CSSProperties,
} from "@builder.io/qwik";
import {
  type OmittedInputWrapperProps,
  type InputWrapperClassNames,
  type InputWrapperStyles,
  InputProps,
  InputWrapper,
  CloseIcon,
  Input,
  IconChevronDown,
  IconX,
} from "~/internal";
import clsx from "clsx";
import { Group } from "../group";
import { Dropdown } from "./dropdown";
import { SelectInputContext } from "./selectInputContext";
import commonClasses from "~/common.module.scss";
import classes from "./selectInput.module.scss";
import { Floater } from "../floater";

export type SelectValue = string | number;

export interface SelectOption {
  label: string;
  description?: string;
  value: SelectValue;
  group?: string;
}

export type SelectInputStyles = {
  wrapper?: InputWrapperStyles;
  input?: CSSProperties;
  icon?: CSSProperties;
  dropdown?: CSSProperties;
  option?: CSSProperties;
};

export type SelectInputClassNames = {
  wrapper?: InputWrapperClassNames;
  input?: string;
  icon?: string;
  dropdown?: string;
  option?: string;
};

export type SelectInputProps = OmittedInputWrapperProps & {
  data: SelectOption[];
  onSearch$?: (search: string) => void;
  classNames?: SelectInputClassNames;
  styles?: SelectInputStyles;
  dropdownState?: Signal<boolean>;
  tabIndex?: number;
  noFilter?: boolean;
  onClear$?: () => void;
  multiple?: boolean;
  required?: boolean;
  value?: SelectValue | SelectValue[] | null;
  onChange$?: (value: SelectValue | SelectValue[] | null) => void;
};
// & (
//     | {
//         multiple?: false;
//         required?: false;
//         value?: SelectValue | null;
//         onChange$?: (value: SelectValue | null) => void;
//       }
//     | {
//         multiple: true;
//         required?: false;
//         value?: SelectValue[];
//         onChange$?: (value: SelectValue[]) => void;
//       }
//     | {
//         multiple?: false;
//         required: true;
//         value?: SelectValue;
//         onChange$?: (value: SelectValue) => void;
//       }
//     | {
//         multiple: true;
//         required: true;
//         value?: SelectValue[];
//         onChange$?: (value: SelectValue[]) => void;
//       }
//   );

// TODO Dropdown over parent elements (see phone input on login screen)
export const SelectInput = component$<SelectInputProps>(
  ({
    data,
    onChange$,
    onSearch$,
    value,
    multiple,
    classNames,
    styles,
    label,
    description,
    error,
    dropdownState,
    required,
    disabled,
    tabIndex,
    noFilter,
    onClear$,
  }) => {
    const relativeRef = useSignal<HTMLInputElement>();
    const inputRef = useSignal<HTMLInputElement>();
    const popupRef = useSignal<HTMLDivElement>();
    const searchValue = useSignal<string | null>(null);
    const selectedOption = useSignal<SelectValue | SelectValue[] | undefined>(
      value ?? undefined
    );
    const inputValue = useSignal(value);
    const localDropdownState = useSignal(false);
    const open = dropdownState || localDropdownState;
    const randomId = useId();

    const filteredOptions = useComputed$(() => {
      if (typeof searchValue.value !== "string") return data;

      const upperSearchValue = searchValue.value.toUpperCase();

      return noFilter
        ? data
        : data.filter((option) => {
            const matchesSearchValue =
              option.label.toUpperCase().includes(upperSearchValue) ||
              (option.description &&
                option.description.toUpperCase().includes(upperSearchValue));

            if (!multiple) return matchesSearchValue;

            const notInValueArray = !value?.some((val) => val === option.value);

            return matchesSearchValue && notInValueArray;
          });
    });

    const inputLabel = useComputed$(
      () =>
        data.find((option) => option.value === inputValue.value)?.label ||
        (inputValue.value ? JSON.stringify(inputValue.value) : "")
    );

    const changeHandler = $(
      (value: SelectValue | SelectValue[] | undefined) => {
        inputValue.value = value;
        selectedOption.value = value;
        searchValue.value = null;

        if (onChange$) {
          if (multiple) onChange$((value as SelectValue[]) ?? []);
          else onChange$((value as SelectValue) ?? null);
        }
      }
    );

    const blurHandler = $(() => {
      open.value = false;
      if (
        !required &&
        searchValue.value === "" &&
        inputValue.value !== undefined
      ) {
        changeHandler(undefined);
      }
      searchValue.value = null;
      inputRef.value?.blur();
    });

    const inputHandler = $((event: Event) => {
      const target = event.target as HTMLInputElement;
      searchValue.value = target.value;
      if (onSearch$) onSearch$(target.value);
    });

    const keyDownHandler = $((event: KeyboardEvent) => {
      const getNextIndex = (currentIndex: number, step: number) =>
        (currentIndex + step + filteredOptions.value.length) %
        filteredOptions.value.length;

      const currentIndex = selectedOption.value
        ? filteredOptions.value.findIndex(
            ({ value }) => value === selectedOption.value
          )
        : event.code === "ArrowUp"
        ? 0
        : -1;

      switch (event.code) {
        case "Enter":
          if (filteredOptions.value.length) {
            const optionValue =
              filteredOptions.value.find(
                ({ value }) => selectedOption.value === value
              )?.value ?? filteredOptions.value[0]?.value;

            if (multiple)
              changeHandler(
                optionValue
                  ? value
                    ? [...value, optionValue]
                    : [optionValue]
                  : undefined
              );
            else changeHandler(optionValue);

            if (!multiple) blurHandler();
          }
          break;
        case "ArrowDown":
          selectedOption.value =
            filteredOptions.value[getNextIndex(currentIndex, 1)]?.value;
          break;
        case "ArrowUp":
          selectedOption.value =
            filteredOptions.value[getNextIndex(currentIndex, -1)]?.value;
          break;
        case "Backspace":
          if (multiple && value && !searchValue.value) {
            const clone = [...value];
            clone.pop();
            changeHandler(clone);
          }
          break;
        case "Escape":
          blurHandler();
          break;
      }
    });

    useContextProvider(SelectInputContext, {
      classNames,
      styles,
      filteredOptions,
      searchValue,
      selectedOption,
      inputValue,
      select: $((selectValue: SelectValue) => {
        changeHandler(
          multiple
            ? value
              ? [...value, selectValue]
              : [selectValue]
            : selectValue
        );
        if (!multiple) blurHandler();
      }),
    });

    useTask$(({ track }) => {
      track(() => value);

      inputValue.value = value;
    });

    useVisibleTask$(({ cleanup }) => {
      const clickHandler = (event: MouseEvent) => {
        if (
          !disabled &&
          inputRef.value &&
          popupRef.value &&
          event.target &&
          !popupRef.value.contains(event.target as Node) &&
          !inputRef.value.contains(event.target as Node)
        )
          blurHandler();
      };

      document.addEventListener("mousedown", clickHandler);

      cleanup(() => document.removeEventListener("mousedown", clickHandler));
    });

    const inputProps: InputProps = {
      ref: inputRef,
      type: "text",
      autoComplete: "off",
      spellcheck: false,
      "aria-autocomplete": "both",
      "aria-haspopup": false,
      id: randomId,
      value:
        searchValue.value === null
          ? multiple
            ? undefined
            : inputLabel.value
          : searchValue.value,
      onInput$: inputHandler,
      onKeyDown$: keyDownHandler,
      onFocus$: $(() => {
        open.value = true;
      }),
      error: !!error,
      disabled,
      required,
      tabIndex,
    };

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
        {multiple ? (
          <Group
            ref={relativeRef}
            gap="sm"
            onClick$={() => {
              inputRef.value?.focus();
            }}
            style={styles?.input}
            class={clsx(
              commonClasses.input,
              classes["multiple-wrapper"],
              {
                [commonClasses["input--error"]]: error && !disabled,
                [classes["multiple-wrapper--open"]]: open.value,
                [classes["multiple-wrapper--disabled"]]: disabled,
              },
              classNames?.input
            )}
          >
            {value?.map((singleValue) => (
              <div
                key={singleValue}
                class={clsx(classes["multiple-item"], {
                  [classes["multiple-item--disabled"]]: disabled,
                })}
              >
                <p>
                  {data.find((option) => option.value === singleValue)?.label}
                </p>
                {!disabled && (
                  <IconX
                    class={classes["multiple-item-icon"]}
                    onClick$={() => {
                      changeHandler(
                        value.filter((current) => current !== singleValue)
                      );
                      if (onClear$) onClear$();
                    }}
                  />
                )}
              </div>
            ))}
            <input
              class={clsx(classes["multiple-input"], classNames?.input)}
              {...inputProps}
            />
          </Group>
        ) : (
          <Input
            class={clsx(classes.input, classNames?.input)}
            style={styles?.input}
            {...inputProps}
          />
        )}
        {!disabled &&
          (!required &&
          (Array.isArray(inputValue.value)
            ? inputValue.value.length
            : inputValue.value) ? (
            <CloseIcon
              style={styles?.icon}
              class={classNames?.icon}
              onClick$={() => {
                changeHandler(undefined);
                if (onClear$) onClear$();
              }}
            />
          ) : (
            <IconChevronDown
              style={styles?.icon}
              class={clsx(classes["chevron-icon"], classNames?.icon, {
                [classes["chevron-icon--open"]]: open.value,
              })}
              onClick$={() => {
                open.value = !open.value;
                inputRef.value?.focus();
              }}
            />
          ))}
        {open.value && (filteredOptions.value.length || searchValue.value) && (
          <Floater relativeRef={multiple ? relativeRef : inputRef}>
            <Dropdown ref={popupRef} />
          </Floater>
        )}
      </InputWrapper>
    );
  }
);
