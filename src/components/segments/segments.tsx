import {
  component$,
  useSignal,
  useVisibleTask$,
  useId,
  useStore,
  QwikIntrinsicElements,
  $,
} from "@builder.io/qwik";
import styles from "./segments.module.scss";
import {
  QuiColor,
  QuiSize,
  classBuilder,
  getColor,
  getSize,
  inject,
} from "~/internal";

export type SegmentsIntrinsic = {
  overlay?: QwikIntrinsicElements["span"];
  segment?: QwikIntrinsicElements["button"];
};

export type SegmentsData = { label: string; value: string; disabled?: boolean };

export type SegmentsProps = QwikIntrinsicElements["div"] & {
  intrinsic?: SegmentsIntrinsic;
  data: SegmentsData[];
  size?: QuiSize;
  color?: QuiColor;
  value?: string;
  onChange$?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
};

const cb = classBuilder(styles);

export const Segments = component$<SegmentsProps>(
  ({
    intrinsic,
    data,
    size = "md",
    color,
    value,
    onChange$,
    orientation = "horizontal",
    disabled,
    ...props
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
        {...inject(props, {
          style: [`--qui-segments-size: ${getSize(size)}`, getColor(color)],
          class: cb("root", { vertical: orientation === "vertical" }),
        })}
      >
        <span
          {...inject(intrinsic?.overlay, {
            style: [
              `--qui-segments-overlay-width: ${activeSize.width}px`,
              `--qui-segments-overlay-height: ${activeSize.height}px`,
              `--qui-segments-overlay-left: ${activeSize.offsetLeft}px`,
              `--qui-segments-overlay-top: ${activeSize.offsetTop}px`,
            ],
            class: styles.overlay,
          })}
        />
        {data.map(({ value, label, disabled: disabledOption }, index) => (
          <button
            key={value}
            // TODO use ref instead
            id={`qui-segment-${randomId}-${value}`}
            disabled={disabled || disabledOption}
            {...inject(intrinsic?.segment, {
              class: cb("segment", {
                previousActive: currentValue.value === data[index - 1]?.value,
                active: currentValue.value === value,
              }),
              onClick$: $(() => {
                currentValue.value = value;
                if (onChange$) onChange$(currentValue.value);
              }),
            })}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }
);
