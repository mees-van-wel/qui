import { QwikIntrinsicElements, component$ } from "@builder.io/qwik";
import { getColor, inject, type QuiColor } from "~/internal";
import styles from "./progressSection.module.scss";

export type Section = {
  value: number;
  color?: QuiColor;
  label?: string;
};

export type ProgressSectionProps = QwikIntrinsicElements["div"];

export const ProgressSection = component$<ProgressSectionProps & Section>(
  ({ value, color, label, ...props }) => (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      {...inject(props, {
        style: [`--qui-progress-section-width: ${value}%`, getColor(color)],
        class: styles.root,
      })}
    >
      {label}
    </div>
  ),
);
