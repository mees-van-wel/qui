import { component$, useContext, useId } from "@builder.io/qwik";
import { ChoiceOption, ChoiceValue } from "../types";
import { ChoiceContext } from "../choiceInputContext";
import styles from "./checkbox.module.scss";
import { Group } from "~/components/group";
import { classBuilder } from "~/internal";

export type CheckboxProps = {
  option: ChoiceOption;
  value?: ChoiceValue[];
  onChange$?: (value: ChoiceValue[]) => void;
  invalid?: boolean;
};

const cb = classBuilder(styles);

export const Checkbox = component$<CheckboxProps>(
  ({ option, value, onChange$, invalid }) => {
    const { disabled, id } = useContext(ChoiceContext);
    const randomId = useId();

    return (
      <Group gap="xs">
        <input
          onChange$={(_, el) => {
            if (onChange$)
              onChange$(
                el.checked
                  ? [...(value || []), option.value].sort()
                  : (value || []).filter((val) => val !== option.value).sort()
              );
          }}
          id={randomId}
          type="checkbox"
          value={option.value}
          name={id}
          checked={value?.includes(option.value)}
          disabled={disabled}
          class={[styles.input, cb("input", { invalid })]}
        />
        <div>
          <label class={styles.label} for={randomId}>
            {option.label}
          </label>
          {option.description && (
            <p class={styles.description}>{option.description}</p>
          )}
        </div>
      </Group>
    );
  }
);
