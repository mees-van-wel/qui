import {
  type CSSProperties,
  type QwikIntrinsicElements,
  component$,
  useContext,
} from "@builder.io/qwik";
import clsx from "clsx";
import commonClasses from "~/common.module.scss";
import { UiContext } from "~/context";

export type InputProps = Omit<QwikIntrinsicElements["input"], "style"> & {
  style?: CSSProperties;
  error?: boolean;
};

export const Input = component$<InputProps>(
  ({ disabled, error, class: className, autoComplete = "off", ...props }) => {
    const { locale } = useContext(UiContext);

    return (
      // @ts-ignore
      <input
        class={clsx(
          commonClasses.input,
          {
            [commonClasses["input--error"]]: error && !disabled,
            "keeper-ignore": autoComplete === "off",
          },
          className
        )}
        lang={locale}
        disabled={disabled}
        autoComplete={autoComplete}
        data-form-type={autoComplete === "off" ? "other" : undefined}
        aria-autocomplete={autoComplete === "off" ? "none" : "both"}
        aria-haspopup={autoComplete !== "off"}
        aria-invalid={!!error}
        {...(autoComplete === "off" ? { "data-lpignore": true } : {})}
        {...props}
      />
    );
  }
);
