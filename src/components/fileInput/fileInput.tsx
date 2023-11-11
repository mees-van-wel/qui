import {
  type Signal,
  component$,
  useId,
  useSignal,
  type NoSerialize,
  noSerialize,
  useTask$,
  useContext,
  CSSProperties,
} from "@builder.io/qwik";
import {
  type OmittedInputWrapperProps,
  type InputWrapperClassNames,
  type InputWrapperStyles,
  InputWrapper,
  CloseIcon,
} from "~/internal";
import clsx from "clsx";
import { UiContext } from "~/context";
import commonClasses from "~/common.module.scss";
import classes from "./fileInput.module.scss";

export type FileInputStyles = {
  wrapper?: InputWrapperStyles;
  input?: CSSProperties;
  closeIcon?: CSSProperties;
};

export type FileInputClasses = {
  wrapper?: InputWrapperClassNames;
  input?: string;
  closeIcon?: string;
};

export type FileInputProps = OmittedInputWrapperProps & {
  styles?: FileInputStyles;
  classNames?: FileInputClasses;
  autoFocus?: boolean;
  name?: string;
  accept?: string;
  placeholder?: string;
  ref?: Signal<HTMLInputElement | undefined>;
  multiple?: boolean;
  required?: boolean;
  value?: File | FileList | null;
  onChange$?: (value: File | FileList | null) => void;
};
// & (
//     | {
//         multiple?: false;
//         required?: false;
//         value?: File | null;
//         onChange$?: (value: File | null) => void;
//       }
//     | {
//         multiple: true;
//         required?: false;
//         value?: FileList | null;
//         onChange$?: (value: FileList | null) => void;
//       }
//     | {
//         multiple?: false;
//         required: true;
//         value?: File | null;
//         onChange$?: (value: File) => void;
//       }
//     | {
//         multiple: true;
//         required: true;
//         value?: FileList | null;
//         onChange$?: (value: FileList) => void;
//       }
//   );

export const FileInput = component$<FileInputProps>(
  ({
    styles,
    classNames,
    label,
    description,
    error,
    required,
    disabled,
    value,
    multiple,
    onChange$,
    ...props
  }) => {
    const files = useSignal<NoSerialize<FileList | File> | null>(
      value ? noSerialize(value) : null
    );

    const element = useSignal<HTMLInputElement>();
    const randomId = useId();
    const { strings } = useContext(UiContext);

    useTask$(({ track }) => {
      track(() => value);
      files.value = value ? noSerialize(value) : null;
    });

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
        <input
          class={classes.input}
          ref={element}
          id={randomId}
          disabled={disabled}
          type="file"
          multiple={multiple}
          onChange$={(_, element) => {
            const formattedValue =
              (multiple ? element.files : element.files?.[0]) || null;
            if (required && !formattedValue) return;

            files.value = formattedValue ? noSerialize(formattedValue) : null;
            // @ts-ignore
            if (onChange$) onChange$(formattedValue);
          }}
          {...props}
        />
        <button
          type="button"
          style={styles?.input}
          class={clsx(commonClasses.input, classes.button, classNames?.input, {
            [commonClasses["input--error"]]: error && !disabled,
          })}
          onClick$={() => {
            element.value?.click();
          }}
          disabled={disabled}
        >
          {files.value
            ? files.value instanceof File
              ? files.value.name
              : Array.from(files.value)
                  .map((file) => file.name)
                  .join(", ")
            : strings?.selectFiles || "Select file(s)"}
        </button>
        {!required && files.value && (
          <CloseIcon
            style={styles?.closeIcon}
            class={classNames?.closeIcon}
            onClick$={() => {
              files.value = null;
              if (onChange$) onChange$(null);
            }}
          />
        )}
      </InputWrapper>
    );
  }
);
