import { type QwikIntrinsicElements, component$ } from "@builder.io/qwik";
import { QuiSize, getSize, inject } from "~/internal";
import styles from "./progress.module.scss";
import {
  ProgressSection,
  type Section,
  type ProgressSectionProps,
} from "./progressSection";

type BaseProgressProps = QwikIntrinsicElements["div"] & {
  size?: QuiSize;
};

type WithSections = {
  sections: Section[];
  animated?: never;
  value?: never;
  color?: never;
  label?: never;
  subProps?: {
    sections?: (ProgressSectionProps | undefined)[];
  };
};

type WithoutSections = Section & {
  sections?: never;
  subProps?: {
    section?: ProgressSectionProps;
  };
  animated?: boolean;
};

export type ProgressProps = BaseProgressProps &
  (WithSections | WithoutSections);

export const Progress = component$<ProgressProps>(
  ({
    subProps,
    size = "md",
    value,
    color,
    label,
    animated,
    sections,
    ...props
  }) => (
    <div
      {...inject(props, {
        style: `--qui-progress-size: ${getSize(size)}`,
        class: styles.root,
      })}
    >
      {Array.isArray(sections) ? (
        sections.map(({ value, color, label }, index) => (
          <ProgressSection
            key={index}
            value={value}
            color={color}
            label={label}
            {...subProps?.sections?.[index]}
          />
        ))
      ) : (
        <ProgressSection
          value={value}
          color={color}
          label={label}
          {...subProps?.section}
        />
      )}
      {animated && <div class={styles.animation} />}
    </div>
  ),
);
