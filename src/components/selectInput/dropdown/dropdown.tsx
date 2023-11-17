import {
  component$,
  useContext,
  useComputed$,
  type Signal,
} from "@builder.io/qwik";
import { SelectValue } from "../selectInput";
import { Option } from "../option";
import { SelectInputContext } from "../selectInputContext";
import { UiContext } from "~/context";
import { Paper } from "~/components/paper";
import clsx from "clsx";
import classes from "./dropdown.module.scss";

export type DropdownProps = {
  ref?: Signal<HTMLDivElement | undefined>;
  onClick$?: (value: SelectValue | SelectValue[]) => void;
};

export const Dropdown = component$<DropdownProps>(({ ref, onClick$ }) => {
  const { classNames, styles, filteredOptions, searchValue } =
    useContext(SelectInputContext);
  const { strings } = useContext(UiContext);

  const groups = useComputed$(() =>
    filteredOptions.value.reduce<string[]>(
      (array, { group }) =>
        group && !array.includes(group) ? [...array, group] : array,
      []
    )
  );

  return (
    <Paper
      ref={ref}
      variant="background"
      noPadding
      fullWidth
      class={clsx(classes.root, classNames?.dropdown)}
      style={styles?.dropdown}
    >
      {filteredOptions.value.length
        ? groups.value.length
          ? groups.value.sort().map((group) => (
              <div key={group}>
                <div class={classes.group}>
                  <p class={classes["group-text"]}>{group}</p>
                </div>
                {filteredOptions.value
                  .filter((option) => option.group === group)
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((option) => (
                    <Option
                      key={option.value}
                      option={option}
                      onClick$={onClick$}
                    />
                  ))}
              </div>
            ))
          : filteredOptions.value
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((option) => (
                <Option
                  key={option.value}
                  option={option}
                  onClick$={onClick$}
                />
              ))
        : searchValue.value && (
            <p class={classes["not-found"]}>
              {strings?.nothingFound || "Nothing found..."}
            </p>
          )}
    </Paper>
  );
});
