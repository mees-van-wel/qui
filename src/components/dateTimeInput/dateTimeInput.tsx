import {
  component$,
  useId,
  useSignal,
  $,
  CSSProperties,
} from "@builder.io/qwik";
import {
  InputWrapper,
  type OmittedInputWrapperProps,
  type InputWrapperClassNames,
  type InputWrapperStyles,
  CloseIcon,
} from "~/internal";
import {
  DateInput,
  dateToDateString,
  type DateInputClassNames,
  type DateInputStyles,
} from "../dateInput";
import {
  TimeInput,
  type TimeInputClassNames,
  type TimeInputStyles,
} from "../timeInput";
import clsx from "clsx";
import classes from "./dateTimeInput.module.scss";

function updateTime(date: Date, time: string) {
  if (!time) return date;

  const [hours, minutes] = time.split(":").map(Number);
  const clone = new Date(date);
  clone.setHours(hours);
  clone.setMinutes(minutes);

  return clone;
}

export const dateToTimeString = (date: Date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

export type DateTimeInputStyles = {
  wrapper?: InputWrapperStyles;
  dateInput?: DateInputStyles;
  timeInput?: TimeInputStyles;
  icon?: CSSProperties;
};

export type DateTimeInputClassNames = {
  wrapper?: InputWrapperClassNames;
  dateInput?: DateInputClassNames;
  timeInput?: TimeInputClassNames;
  icon?: string;
};

export type DateTimeInputProps = Omit<OmittedInputWrapperProps, "required"> & {
  styles?: DateTimeInputStyles;
  classNames?: DateTimeInputClassNames;
  value?: Date | null;
  required?: boolean;
  onChange$?: (value: Date | null) => void;
};
// TODO Conditional function prop type https://github.com/BuilderIO/qwik/issues/3719
// & (
//     | {
//         required?: false;
//         onChange$?: (value: Date | null) => void;
//       }
//     | {
//         required: true;
//         onChange$?: (value: Date) => void;
//       }
//   );

export const DateTimeInput = component$<DateTimeInputProps>(
  ({
    classNames,
    styles,
    label,
    description,
    error,
    required,
    disabled,
    value,
    onChange$,
  }) => {
    const dateInputRef = useSignal<HTMLInputElement>();
    const timeInputRef = useSignal<HTMLInputElement>();
    const randomId = useId();

    const dateChangeHandler = $((value: Date | null) => {
      const timeInput = timeInputRef.value;
      if (!timeInput) return;

      if (!value) return clearHandler();

      if (!timeInput.value) timeInput.value = "00:00";
      const date = updateTime(new Date(value), timeInput.value);

      if (onChange$) onChange$(date);
    });

    const timeChangeHandler = $((value: string) => {
      const dateInput = dateInputRef.value;
      if (!dateInput) return;

      if (!value) return clearHandler();

      let date = dateInput.value ? new Date(dateInput.value) : new Date();

      if (!dateInput.value) dateInput.value = dateToDateString(date);
      date = updateTime(date, value);

      if (onChange$) onChange$(date);
    });

    const clearHandler = $(() => {
      if (!dateInputRef.value || !timeInputRef.value || required) return;
      dateInputRef.value.value = "";
      timeInputRef.value.value = "";
      if (onChange$) onChange$(null);
    });

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
        <DateInput
          styles={styles?.dateInput}
          classNames={{
            input: clsx(classes["date-input"], classNames?.dateInput?.input),
            ...classNames?.dateInput,
          }}
          ref={dateInputRef}
          value={value}
          noIcon={!!value && !required}
          onChange$={dateChangeHandler}
          required={required}
          disabled={disabled}
        />
        <TimeInput
          styles={styles?.timeInput}
          classNames={{
            input: clsx(classes["time-input"], classNames?.timeInput?.input),
            ...classNames?.timeInput,
          }}
          ref={timeInputRef}
          value={value ? dateToTimeString(value) : undefined}
          noIcon={!!value && !required}
          onChange$={timeChangeHandler}
          required={required}
          disabled={disabled}
        />
        {!disabled && !required && value && (
          <CloseIcon
            style={styles?.icon}
            class={classNames?.icon}
            onClick$={clearHandler}
          />
        )}
      </InputWrapper>
    );
  }
);
