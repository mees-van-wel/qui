import { type CSSProperties, $ } from "@builder.io/qwik";
import clsx from "clsx";
import parse from "style-to-object";
import type { Falsy } from "./types";

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

type Inject<T> = {
  style?: Style | Style[];
  class?: Class | Class[];
} & Omit<T, "style" | "class">;

export const inject = <T>(props: T | undefined = {}, inject: Inject<T>) => {
  const newProps = { ...props };

  if (inject.style) {
    newProps.style = (
      Array.isArray(inject.style)
        ? [...inject.style, props.style]
        : [inject.style, props.style]
    ).reduce(
      (acc, style) => ({
        ...acc,
        ...(typeof style === "string" ? parse(style) : style),
      }),
      {}
    );

    delete inject.style;
  }

  if (inject.class) {
    newProps.class = clsx(
      Array.isArray(inject.class)
        ? [...inject.class, props.class]
        : [inject.class, props.class]
    );

    delete inject.class;
  }

  Object.entries(inject).forEach(([key, value]) => {
    if (typeof value === "function")
      newProps[key] = $((event: Event, element: Element) => {
        inject[key](event, element);
        props[key](event, element);
      });
  });

  return newProps;
};
