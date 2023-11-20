import {
  QwikIntrinsicElements,
  component$,
  useContext,
  $,
} from "@builder.io/qwik";
import type { SelectOption } from "../selectInput";
import { SelectInputContext } from "../selectInputContext";
import styles from "./option.module.scss";
import { classBuilder, inject } from "~/internal";

export type OptionIntrisic = {
  root?: QwikIntrinsicElements["button"];
  description?: QwikIntrinsicElements["p"];
};

export type OptionProps = {
  intrinsic?: OptionIntrisic;
  option: SelectOption;
};

const cb = classBuilder(styles);

// {
//   "bg-primary-6/80 text-white dark:bg-primary-8/80":
//     selectedOption.value === option.value,
//   "bg-primary-6 text-white dark:bg-primary-8":
//     inputValue.value === option.value,
// },

export const Option = component$<OptionProps>(({ intrinsic, option }) => {
  const { selectedOption, inputValue, select } = useContext(SelectInputContext);
  return (
    <button
      type="button"
      key={option.value}
      {...inject(intrinsic?.root, {
        class: cb("root", {
          selected: selectedOption.value === option.value,
          current: inputValue.value === option.value,
        }),
        onClick$: $(() => {
          select(option.value);
        }),
      })}
    >
      {option.label}
      {option.description && (
        <p
          {...inject(intrinsic?.description, {
            class: [
              styles.description,
              // {
              //   "text-white/60":
              //     selectedOption.value === option.value ||
              //     inputValue.value === option.value,
              // },
            ],
          })}
        >
          {option.description}
        </p>
      )}
    </button>
  );
});
