import {
  component$,
  useSignal,
  useVisibleTask$,
  useId,
  useStore,
  type CSSProperties,
} from "@builder.io/qwik";
import cslx from "clsx";
import classes from "./segments.module.scss";
import { QuiColor, QuiSize, getColor, getSize } from "~/internal";

export type SegmentsStyles = {
  root?: CSSProperties;
  overlay?: CSSProperties;
  segment?: CSSProperties;
};

export type SegmentsClassNames = {
  root?: string;
  overlay?: string;
  segment?: string;
};

export type SegmentsData = { label: string; value: string; disabled?: boolean };

export type SegmentsProps = {
  styles?: SegmentsStyles;
  classNames?: SegmentsClassNames;
  data: SegmentsData[];
  size?: QuiSize;
  color?: QuiColor;
  value?: string;
  onChange$?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
};

export const Segments = component$<SegmentsProps>(
  ({
    styles,
    classNames,
    data,
    size = "md",
    color,
    value,
    onChange$,
    orientation = "horizontal",
    disabled,
  }) => {
    const currentValue = useSignal(value || data[0]?.value);
    const randomId = useId();
    const activeSize = useStore({
      width: 0,
      height: 0,
      offsetLeft: 0,
      offsetTop: 0,
    });

    useVisibleTask$(({ track, cleanup }) => {
      track(() => currentValue.value);

      const handleResize = () => {
        const segment = document.querySelector<HTMLElement>(
          `#qui-segment-${randomId}-${currentValue.value}`
        );

        if (!segment) return;

        activeSize.width = segment.clientWidth;
        activeSize.height = segment.clientHeight;
        activeSize.offsetLeft = segment.offsetLeft;
        activeSize.offsetTop = segment.offsetTop;
      };

      handleResize();

      window.addEventListener("resize", handleResize);
      cleanup(() => {
        window.removeEventListener("resize", handleResize);
      });
    });

    return (
      <div
        style={{
          "--qui-segments-size": getSize(size),
          ...getColor(color),
          ...styles?.root,
        }}
        class={cslx(
          classes.root,
          {
            [classes["root--vertical"]]: orientation === "vertical",
          },
          classNames?.root
        )}
      >
        <span
          style={{
            "--qui-segments-overlay-width": `${activeSize.width}px`,
            "--qui-segments-overlay-height": `${activeSize.height}px`,
            "--qui-segments-overlay-left": `${activeSize.offsetLeft}px`,
            "--qui-segments-overlay-top": `${activeSize.offsetTop}px`,
            ...styles?.overlay,
          }}
          class={cslx(classes.overlay, classNames?.overlay)}
        />
        {data.map(({ value, label, disabled: disabledOption }, index) => (
          <button
            key={value}
            style={styles?.segment}
            class={cslx(
              classes.segment,
              {
                [classes["segment--previous-active"]]:
                  currentValue.value === data[index - 1]?.value,
                [classes["segment--active"]]: currentValue.value === value,
              },
              classNames?.segment
            )}
            id={`qui-segment-${randomId}-${value}`}
            onClick$={() => {
              currentValue.value = value;
              if (onChange$) onChange$(currentValue.value);
            }}
            disabled={disabled || disabledOption}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }
);
