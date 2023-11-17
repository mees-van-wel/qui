import { component$, useContext } from "@builder.io/qwik";
import type { SelectOption, SelectValue } from "../selectInput";
import clsx from "clsx";
import { SelectInputContext } from "../selectInputContext";
import classes from "./option.module.scss";

export type OptionProps = {
  option: SelectOption;
  onClick$?: (value: SelectValue | SelectValue[]) => void;
}

export const Option = component$<OptionProps>(({ option }) => {
  const { classNames, styles, selectedOption, inputValue, select } =
    useContext(SelectInputContext);

  return (
    <button
      type="button"
      key={option.value}
      class={clsx(
        classes.root,
        classNames?.option,
        {
          "bg-primary-6/80 text-white dark:bg-primary-8/80":
            selectedOption.value === option.value,
          "bg-primary-6 text-white dark:bg-primary-8":
            inputValue.value === option.value,
        }
      )}
      style={styles?.option}
      onClick$={() => {
        select(option.value);
      }}
    >
      {option.label}
      {option.description && (
        <p
          class={clsx(
            "text-xs text-text/60 transition-colors group-hover:text-white/60",
            {
              "text-white/60":
                selectedOption.value === option.value ||
                inputValue.value === option.value,
            }
          )}
        >
          {option.description}
        </p>
      )}
    </button>
  );
});
