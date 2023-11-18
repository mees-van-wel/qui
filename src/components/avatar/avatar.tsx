import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";
import {
  IconUserCircle,
  QuiColor,
  QuiSize,
  getColor,
  getSize,
  inject,
} from "~/internal";
import styles from "./avatar.module.scss";

export type AvatarSubProps = {
  icon?: QwikIntrinsicElements["svg"];
  image?: QwikIntrinsicElements["img"];
};

export type AvatarProps = QwikIntrinsicElements["div"] & {
  subProps?: AvatarSubProps;
  size?: QuiSize;
  color?: QuiColor;
  content?: string;
};

// TODO Add variants
export const Avatar = component$<AvatarProps>(
  ({ subProps, size = "md", color, content, ...props }) => {
    return (
      <div
        {...inject(props, {
          style: [`--qui-avatar-size: ${getSize(size)}`, getColor(color)],
          class: styles.root,
        })}
      >
        {!content ? (
          <IconUserCircle {...subProps?.icon} />
        ) : content.startsWith("http") ? (
          // TODO Fix width-height
          // eslint-disable-next-line qwik/jsx-img
          <img
            decoding="async"
            loading="lazy"
            src={content}
            {...inject(subProps?.image, { class: styles.image })}
          />
        ) : (
          content
        )}
      </div>
    );
  },
);
