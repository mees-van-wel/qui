import { component$, useId, useSignal, $ } from "@builder.io/qwik";
import {
  type CloseIconProps,
  type InputWrapperProps,
  InputWrapper,
  CloseIcon,
  inject,
} from "~/internal";
import { type DateInputProps, DateInput, dateToDateString } from "../dateInput";
import { TimeInput, type TimeInputProps } from "../timeInput";
import styles from "./dateTimeInput.module.scss";

const updateTime = (date: Date, time: string) => {
  if (!time) return date;

  const [hours, minutes] = time.split(":").map(Number);
  const clone = new Date(date);
  clone.setHours(hours);
  clone.setMinutes(minutes);

  return clone;
};

export const dateToTimeString = (date: Date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

export type DateTimeInputSubProps = {
  dateInput?: DateInputProps;
  timeInput?: TimeInputProps;
  closeIcon?: CloseIconProps;
};

export type DateTimeInputProps = InputWrapperProps & {
  subProps?: DateTimeInputSubProps;
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
    subProps,
    label,
    description,
    error,
    required,
    disabled,
    value,
    onChange$,
    ...props
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
        label={label}
        description={description}
        error={error}
        required={required}
        disabled={disabled}
        {...props}
      >
        <DateInput
          ref={dateInputRef}
          value={value}
          noIcon={!!value && !required}
          required={required}
          disabled={disabled}
          {...inject(subProps?.dateInput, {
            subProps: { input: { class: styles["date-input"] } },
            onChange$: dateChangeHandler,
          })}
        />
        <TimeInput
          ref={timeInputRef}
          value={value ? dateToTimeString(value) : undefined}
          noIcon={!!value && !required}
          required={required}
          disabled={disabled}
          {...inject(subProps?.timeInput, {
            subProps: { input: { class: styles["time-input"] } },
            onChange$: timeChangeHandler,
          })}
        />
        {!disabled && !required && value && (
          <CloseIcon
            {...inject(subProps?.closeIcon, {
              onClick$: clearHandler,
            })}
          />
        )}
      </InputWrapper>
    );
  }
);
