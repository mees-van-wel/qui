import {
  type CSSProperties,
  type QwikIntrinsicElements,
  component$,
} from "@builder.io/qwik";
import clsx from "clsx";
import { QuiColor, QuiSize, getSize, getColor } from "~/internal";
import classes from "./progress.module.scss";

export type ProgressStyles = {
  root?: CSSProperties;
  section?: CSSProperties;
};

export type ProgressClassNames = {
  root?: string;
  section?: string;
};

type BaseProgressProps = Omit<
  QwikIntrinsicElements["div"],
  "style" | "class"
> & {
  styles?: ProgressStyles;
  classNames?: ProgressClassNames;
  size?: QuiSize;
};

type Section = {
  value: number;
  color?: QuiColor;
  label?: string;
};

type WithSections = {
  sections: Section[];
  animated?: never;
  value?: never;
  color?: never;
  label?: never;
};

type WithoutSections = Section & {
  sections?: never;
  animated?: boolean;
};

export type ProgressProps = BaseProgressProps &
  (WithSections | WithoutSections);

export const Progress = component$<ProgressProps>(
  ({
    styles,
    classNames,
    size = "md",
    value,
    color,
    label,
    animated,
    sections,
    ...props
  }) => (
    <div
      style={{
        "--qui-progress-size": getSize(size),
        ...styles?.root,
      }}
      class={clsx(classes.root, classNames?.root)}
      {...props}
    >
      {Array.isArray(sections) ? (
        sections.map((section, index) => (
          <ProgressSection
            key={index}
            {...section}
            style={styles?.section}
            class={classNames?.section}
          />
        ))
      ) : (
        // @ts-ignore
        <ProgressSection value={value} color={color} label={label} />
      )}
      {animated && <div class={classes["root__animation"]} />}
    </div>
  )
);

export type ProgressSectionProps = Section & {
  style: CSSProperties | undefined;
  class: string | undefined;
};

const ProgressSection = component$<ProgressSectionProps>(
  ({ style, class: className, value, color, label }) => (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        "--qui-progress-section-width": `${value}%`,
        ...getColor(color),
        ...style,
      }}
      class={clsx(classes["root__section"], className)}
    >
      {label}
    </div>
  )
);
