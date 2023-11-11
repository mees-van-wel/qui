import type { QRL } from "@builder.io/qwik";
import { type Signal, createContextId } from "@builder.io/qwik";
import type {
  SelectInputProps,
  SelectOption,
  SelectValue,
} from "./selectInput";

export type SelectInputContext = Pick<
  SelectInputProps,
  "classNames" | "styles"
> & {
  filteredOptions: Readonly<Signal<SelectOption[]>>;
  searchValue: Signal<string | null>;
  selectedOption: Signal<SelectValue | SelectValue[] | undefined>;
  inputValue: Signal<SelectValue | SelectValue[] | null | undefined>;
  select: QRL<(selectValue: SelectValue) => void>;
};

export const SelectInputContext = createContextId<SelectInputContext>(
  "dev.hexa-it.qwik-ui.selectInput"
);
