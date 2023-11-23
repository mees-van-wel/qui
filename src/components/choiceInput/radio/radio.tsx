import { component$, useContext, useId } from "@builder.io/qwik";
import { ChoiceContext } from "../choiceInputContext";
import { ChoiceOption, ChoiceValue } from "../types";
import { Group } from "~/components/group";
import styles from "./radio.module.scss";
import { classBuilder } from "~/internal";

export type RadioProps = {
  option: ChoiceOption;
  value?: ChoiceValue | null;
  onChange$?: (value: ChoiceValue) => void;
  invalid?: boolean;
};

export const Radio = component$<RadioProps>(
  ({ option, value, onChange$, invalid }) => {
    const cb = classBuilder(styles);
    const { disabled, id } = useContext(ChoiceContext);
    const randomId = useId();

    return (
      <Group gap="xs">
        <input
          onChange$={() => {
            if (onChange$) onChange$(option.value);
          }}
          id={randomId}
          type="radio"
          value={option.value}
          name={id}
          checked={value === option.value}
          disabled={disabled}
          class={cb("input", { invalid })}
        />
        <div>
          <label for={randomId} class={styles.label}>
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
