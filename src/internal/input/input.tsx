import {
  type QwikIntrinsicElements,
  component$,
  useContext,
} from "@builder.io/qwik";
import commonStyles from "~/common.module.scss";
import { UiContext } from "~/context";
import { inject } from "../inject";
import { classBuilder } from "../classBuilder";

export type InputProps = QwikIntrinsicElements["input"] & {
  invalid?: boolean;
};

const cb = classBuilder(commonStyles);

export const Input = component$<InputProps>(
  ({ disabled, invalid, autoComplete = "off", ...props }) => {
    const { locale } = useContext(UiContext);

    return (
      // @ts-ignore Prop error
      <input
        lang={locale}
        disabled={disabled}
        autoComplete={autoComplete}
        data-form-type={autoComplete === "off" ? "other" : undefined}
        aria-autocomplete={autoComplete === "off" ? "none" : "both"}
        aria-haspopup={autoComplete !== "off"}
        aria-invalid={invalid}
        {...(autoComplete === "off" ? { "data-lpignore": true } : {})}
        {...inject(props, {
          class: [
            cb("input", { error: invalid && !disabled }),
            { "keeper-ignore": autoComplete === "off" },
          ],
        })}
      />
    );
  }
);
