import {
  type CSSProperties,
  $,
  type ClassList,
  type Signal,
} from "@builder.io/qwik";
import clsx from "clsx";
import type { Falsy } from "./types";
import merge from "deepmerge";
import { styleToObject } from "./styleToObject";

type Style = CSSProperties | string | Falsy;
type Class = clsx.ClassValue | Falsy;

export const inject = <
  T extends {
    style?: CSSProperties | string | undefined;
    class?: ClassList | Signal<ClassList>;
  },
>(
  props: T | undefined,
  inject: Omit<T, "style" | "class"> & {
    style?: Style | Style[];
    class?: Class | Class[];
  },
  debug?: boolean
) => {
  const newProps = { ...props };

  if (inject.style)
    // @ts-ignore Props overwrite
    newProps.style = (
      Array.isArray(inject.style)
        ? [...inject.style, props?.style]
        : [inject.style, props?.style]
    ).reduce(
      (acc, style) => ({
        // @ts-ignore reduce type bug
        ...acc,
        ...(typeof style === "string" ? styleToObject(style) : style),
      }),
      {}
    );

  if (inject.class) {
    newProps.class = clsx(
      Array.isArray(inject.class)
        ? [...inject.class, props?.class]
        : [inject.class, props?.class]
    );
  }

  if (props && "intrinsic" in inject && "intrinsic" in props) {
    // @ts-ignore merge types
    newProps.intrinsic = merge(inject.intrinsic, props.intrinsic);
  }

  Object.entries(inject).forEach(([k, value]) => {
    const key = k as keyof typeof inject;
    if (typeof value === "function" && typeof props?.[key] === "function") {
      // @ts-ignore function type
      newProps[key] = $((event: Event, element: Element) => {
        // @ts-ignore function type
        inject[key](event, element);
        // @ts-ignore function type
        props[key](event, element);
      });
    }
  });

  if (debug) {
    console.log("Inject Debug", {
      inject,
      props: newProps,
      output: { ...inject, ...newProps },
    });
  }

  return { ...inject, ...newProps } as T;
};
