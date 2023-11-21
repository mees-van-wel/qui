import {
  type Signal,
  component$,
  useId,
  useSignal,
  type NoSerialize,
  noSerialize,
  useTask$,
  useContext,
  $,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import {
  InputWrapper,
  CloseIcon,
  type InputProps,
  type CloseIconProps,
  type InputWrapperProps,
  inject,
  classBuilder,
} from "~/internal";
import { UiContext } from "~/context";
import commonStyles from "~/common.module.scss";
import styles from "./fileInput.module.scss";

export type FileInputIntrinsic = {
  input?: InputProps;
  button?: QwikIntrinsicElements["button"];
  closeIcon?: CloseIconProps;
};

export type FileInputProps = InputWrapperProps & {
  intrinsic?: FileInputIntrinsic;
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

const cb = classBuilder(commonStyles);

export const FileInput = component$<FileInputProps>(
  ({
    intrinsic,
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
    const element = useSignal<HTMLInputElement>();
    const randomId = useId();
    const { strings } = useContext(UiContext);
    const files = useSignal<NoSerialize<FileList | File> | null>(
      value ? noSerialize(value) : null
    );

    useTask$(({ track }) => {
      // eslint-disable-next-line qwik/valid-lexical-scope
      track(() => value);
      // eslint-disable-next-line qwik/valid-lexical-scope
      files.value = value ? noSerialize(value) : null;
    });

    const changeHandler = $((_: Event, element: HTMLInputElement) => {
      const formattedValue =
        (multiple ? element.files : element.files?.[0]) || null;
      if (required && !formattedValue) return;

      files.value = formattedValue ? noSerialize(formattedValue) : null;
      if (onChange$) onChange$(formattedValue);
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
        <input
          ref={element}
          id={randomId}
          disabled={disabled}
          type="file"
          multiple={multiple}
          {...inject(intrinsic?.input, {
            class: styles.input,
            onChange$: changeHandler,
          })}
        />
        <button
          type="button"
          disabled={disabled}
          {...inject(intrinsic?.button, {
            class: [cb("input", { error: error && !disabled }), styles.button],
            onClick$: $(() => {
              element.value?.click();
            }),
          })}
        >
          {files.value
            ? files.value instanceof File
              ? files.value.name
              : Array.from(files.value)
                  .map((file) => file.name)
                  .join(", ")
            : multiple
            ? strings?.selectFiles || "Select files"
            : strings?.selectFile || "Select file"}
        </button>
        {!required && files.value && (
          <CloseIcon
            {...inject(intrinsic?.closeIcon, {
              onClick$: $(() => {
                files.value = null;
                if (onChange$) onChange$(null);
              }),
            })}
          />
        )}
      </InputWrapper>
    );
  }
);
