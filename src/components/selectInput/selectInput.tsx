import {
  component$,
  useSignal,
  $,
  useComputed$,
  useId,
  QwikIntrinsicElements,
  useOnDocument,
  useContext,
} from "@builder.io/qwik";
import {
  InputProps,
  InputWrapper,
  Input,
  IconChevronDown,
  IconX,
  InputWrapperProps,
  inject,
  classBuilder,
  InputBase,
  QuiColor,
  getColor,
} from "~/internal";
import { type GroupProps } from "../group";
import commonStyles from "~/common.module.scss";
import styles from "./selectInput.module.scss";
import { Floater, FloaterProps } from "../floater";
import { UiContext } from "~/context";
import { useUpdateTask } from "~/hooks";

export type SelectValue = string | number;

export interface SelectOption {
  label: string;
  description?: string;
  value: SelectValue;
  group?: string;
}

export type SelectInputIntrinsic = {
  root: InputWrapperProps;
  multipleWrapper?: GroupProps;
  multipleItemWrapper?: QwikIntrinsicElements["div"];
  multipleItem?: QwikIntrinsicElements["div"];
  multipleItemDeleteIcon?: QwikIntrinsicElements["div"];
  option?: QwikIntrinsicElements["button"];
  optionLabel?: QwikIntrinsicElements["span"];
  optionDescription?: QwikIntrinsicElements["span"];
  input?: InputProps;
  icon?: QwikIntrinsicElements["div"];
  dropdown?: FloaterProps;
};

export type SelectInputProps = InputBase<SelectValue | SelectValue[] | null> & {
  intrinsic?: SelectInputIntrinsic;
  data: SelectOption[];
  color?: QuiColor;
  onSearch$?: (search: string) => void;
  multiple?: boolean;
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

const cb = classBuilder(styles);

export const SelectInput = component$<SelectInputProps>(
  ({
    intrinsic,
    data,
    color,
    onChange$,
    onSearch$,
    multiple,
    value = multiple ? [] : null,
    label,
    description,
    error,
    required,
    disabled,
  }) => {
    const { strings } = useContext(UiContext);
    const rootRef = useSignal<HTMLDivElement>();
    const inputRef = useSignal<HTMLDivElement>();
    const open = useSignal(false);
    const current = useSignal(value);
    const search = useSignal<string>();
    const inputId = useId();

    const currentLabel = useComputed$(() =>
      multiple
        ? undefined
        : data.find((option) => option.value === current.value)?.label
    );

    const options = useComputed$(() =>
      data.filter(({ value, label, description }) => {
        const searched = search.value
          ? label
              .toLocaleLowerCase()
              .includes(search.value.toLocaleLowerCase()) ||
            description
              ?.toLocaleLowerCase()
              .includes(search.value.toLocaleLowerCase())
          : true;

        // @ts-ignore DUT
        return multiple ? searched && !current.value.includes(value) : searched;
      })
    );

    const closeHandler = $(() => {
      open.value = false;
      search.value = undefined;
    });

    useUpdateTask(
      $((track) => {
        track(() => value);
      }),
      $(() => {
        current.value = value;
      })
    );

    useUpdateTask(
      $((track) => {
        track(() => current.value);
      }),
      $(() => {
        if (onChange$) onChange$(current.value);
      })
    );

    const keyDownHandler = $((event: KeyboardEvent) => {
      switch (event.code) {
        case "Escape":
          inputRef.value?.blur();
          closeHandler();
          break;

        case "Enter":
          if (!open.value) return;
          current.value = multiple // @ts-ignore DUT
            ? [...current.value, options.value[0].value]
            : options.value[0].value;
          if (!multiple) closeHandler();
          else search.value = undefined;
          break;

        case "Backspace":
          if (!multiple || !current.value) return;
          // @ts-ignore DUT
          current.value = current.value.slice(0, -1);
          break;

        default:
          break;
      }
    });

    const outClickHandler = $((event: Event) => {
      if (!rootRef.value?.contains(event.target as Node)) closeHandler();
    });

    useOnDocument("click", outClickHandler);

    return (
      <InputWrapper
        ref={rootRef}
        inputId={inputId}
        label={label}
        description={description}
        error={error}
        required={required}
        disabled={disabled}
        {...inject(intrinsic?.root, {
          style: getColor(color),
          class: cb("root", {
            open: open.value,
          }),
        })}
      >
        {multiple ? (
          <div
            {...inject(intrinsic?.multipleItemWrapper, {
              class: [commonStyles.input, styles["multiple-wrapper"]],
              onClick$: $(() => {
                inputRef.value?.focus();
              }),
            })}
          >
            {Array.isArray(current.value) &&
              current.value.map((value) => {
                const option = data.find((option) => option.value === value);
                if (!option) return;

                return (
                  <div
                    key={value}
                    {...inject(intrinsic?.multipleItem, {
                      class: styles["multiple-item"],
                      onClick$: $(() => {
                        // @ts-ignore DUT
                        current.value = current.value?.filter(
                          // @ts-ignore DUT
                          (currentValue) => currentValue !== value
                        );

                        open.value = true;
                      }),
                    })}
                  >
                    {option.label}
                    <IconX
                      {...inject(intrinsic?.multipleItemDeleteIcon, {
                        class: styles["multiple-item-delete-icon"],
                      })}
                    />
                  </div>
                );
              })}
            <input
              data-naked
              id={inputId}
              ref={inputRef}
              type="text"
              autoComplete="off"
              spellcheck={false}
              aria-autocomplete="both"
              aria-haspopup={false}
              value={
                search.value === undefined ? currentLabel.value : search.value
              }
              onFocus$={() => {
                open.value = true;
              }}
              onInput$={(_, element) => {
                search.value = element.value;
                if (onSearch$) onSearch$(element.value);
              }}
              // @ts-ignore Wrong event type
              onKeyDown$={keyDownHandler}
              // @ts-ignore Wrong event type
              onBlur$={outClickHandler}
              class={styles["multiple-input"]}
            />
          </div>
        ) : (
          <Input
            ref={inputRef}
            id={inputId}
            type="text"
            autoComplete="off"
            spellcheck={false}
            aria-autocomplete="both"
            aria-haspopup={false}
            value={
              search.value === undefined ? currentLabel.value : search.value
            }
            onFocus$={() => {
              open.value = true;
            }}
            onInput$={(_, element) => {
              search.value = element.value;
              if (!element.value) current.value = null;
              if (onSearch$) onSearch$(element.value);
            }}
            // @ts-ignore Wrong event typing
            onKeyDown$={keyDownHandler}
            // @ts-ignore Wrong event typing
            onBlur$={outClickHandler}
          />
        )}
        {(
          Array.isArray(current.value) ? current.value.length : current.value
        ) ? (
          <IconX
            {...inject(intrinsic?.icon, {
              class: styles["close-icon"],
              onClick$: $(() => {
                current.value = multiple ? [] : null;
                closeHandler();
              }),
            })}
          />
        ) : (
          <IconChevronDown
            {...inject(intrinsic?.icon, {
              class: styles["chevron-icon"],
              onClick$: $(() => {
                open.value = !open.value;
              }),
            })}
          />
        )}
        {open.value && (
          <Floater
            placement="bottom-start"
            relativeRef={rootRef}
            {...inject(intrinsic?.dropdown, {
              class: styles.dropdown,
            })}
          >
            {options.value.length ? (
              options.value.map(({ value, label, description }) => (
                <button
                  data-naked
                  key={value}
                  type="button"
                  {...inject(intrinsic?.option, {
                    class: cb("option", {
                      current: Array.isArray(current.value)
                        ? current.value.includes(value)
                        : current.value === value,
                    }),
                    onClick$: $(() => {
                      current.value = !multiple
                        ? value
                        : Array.isArray(current.value)
                        ? [...current.value, value]
                        : [value];
                      if (!Array.isArray(current.value)) closeHandler();
                    }),
                  })}
                >
                  <span {...intrinsic?.optionLabel}>{label}</span>
                  {description && (
                    <span
                      {...inject(intrinsic?.optionDescription, {
                        class: styles["option-description"],
                      })}
                    >
                      {description}
                    </span>
                  )}
                </button>
              ))
            ) : (
              <p class={styles["not-found-text"]}>
                {strings?.nothingFound || "Nothing found..."}
              </p>
            )}
          </Floater>
        )}
      </InputWrapper>
    );
  }
);
