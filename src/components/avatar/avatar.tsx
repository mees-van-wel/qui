import {
  component$,
  type CSSProperties,
  type QwikIntrinsicElements,
} from "@builder.io/qwik";
import {
  IconUserCircle,
  QuiColor,
  QuiSize,
  getColor,
  getSize,
} from "~/internal";
import clsx from "clsx";
import classes from "./avatar.module.scss";

export type AvatarStyles = {
  root?: CSSProperties;
  image?: CSSProperties;
  icon?: CSSProperties;
};

export type AvatarClassNames = {
  root?: string;
  image?: string;
  icon?: string;
};

export type AvatarProps = Omit<
  QwikIntrinsicElements["div"],
  "styles" | "class" | "color"
> & {
  styles?: AvatarStyles;
  classNames?: AvatarClassNames;
  size?: QuiSize;
  color?: QuiColor;
  content?: string;
};

// TODO Add variants
export const Avatar = component$<AvatarProps>(
  ({ styles, classNames, size = "md", color, content }) => (
    <div
      style={{
        "--qui-avatar-size": getSize(size),
        ...getColor(color),
        ...styles?.root,
      }}
      class={clsx(classes.root, classNames?.root)}
    >
      {!content ? (
        <IconUserCircle style={styles?.image} class={classNames?.icon} />
      ) : content.startsWith("http") ? (
        // TODO Fix width-height
        // eslint-disable-next-line qwik/jsx-img
        <img
          style={styles?.image}
          class={clsx(classes["root__image"], classNames?.image)}
          src={content}
        />
      ) : (
        content
      )}
    </div>
  )
);
