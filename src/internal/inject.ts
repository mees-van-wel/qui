import { type CSSProperties, $ } from "@builder.io/qwik";
import clsx from "clsx";
import parse from "style-to-object";
import type { Falsy } from "./types";
import merge from "deepmerge";

type Style = CSSProperties | string | Falsy;
type Class = clsx.ClassValue | Falsy;

// type BuildPropsArgument = Style | Class | Falsy;

// export function injectProps(
//   props: any,
//   ...stylesOrClasses: Array<BuildPropsArgument>
// ) {
//   const [styles, classes] = [...stylesOrClasses, props?.style, props?.class]
//     .filter((value) => !!value)
//     .reduce(
//       ([styles, classes], element) => {
//         if (
//           Array.isArray(element) ||
//           (typeof element === "object" &&
//             Object.values(element).some((value) => typeof value === "boolean"))
//         ) {
//           return [styles, [...classes, element]];
//         }

//         if (typeof element === "string") {
//           try {
//             return [{ ...styles, ...parse(element) }, classes];
//           } catch (error) {
//             return [styles, [...classes, element]];
//           }
//         }

//         return [{ ...styles, ...element }, classes];
//       },
//       [{}, []]
//     );

//   const newProps = { ...props, style: styles, class: clsx(classes) };

//   return newProps;
// }

type Base<T extends { [key in keyof T]: any }> = {
  style?: Style | Style[];
  class?: Class | Class[];
} & {
  [key in keyof Omit<T, "style" | "class">]: T[key];
} & {
  subProps?: keyof T;
};

export const inject = <T>(
  props: Base<T> | undefined,
  inject: Base<T>,
  debug?: boolean,
) => {
  const newProps = { ...props };

  if (inject.style) {
    newProps.style = (
      Array.isArray(inject.style)
        ? [...inject.style, props?.style]
        : [inject.style, props?.style]
    ).reduce(
      (acc, style) => ({
        // @ts-ignore reduce type bug
        ...acc,
        ...(typeof style === "string" ? parse(style) : style),
      }),
      {},
    );
  }

  if (inject.class) {
    newProps.class = clsx(
      Array.isArray(inject.class)
        ? [...inject.class, props?.class]
        : [inject.class, props?.class],
    );
  }

  if (inject.subProps && props?.subProps) {
    // @ts-ignore merge types
    newProps.subProps = merge(inject.subProps, props.subProps);
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

  return { ...inject, ...newProps };
};
