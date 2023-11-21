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

export type AvatarIntrinsic = {
  icon?: QwikIntrinsicElements["div"];
  image?: QwikIntrinsicElements["img"];
};

export type AvatarProps = QwikIntrinsicElements["div"] & {
  intrinsic?: AvatarIntrinsic;
  size?: QuiSize;
  color?: QuiColor;
  content?: string;
};

// TODO Add variants
export const Avatar = component$<AvatarProps>(
  ({ intrinsic, size = "md", color, content, ...props }) => {
    return (
      <div
        {...inject(props, {
          style: [`--qui-avatar-size: ${getSize(size)}`, getColor(color)],
          class: styles.root,
        })}
      >
        {!content ? (
          <IconUserCircle {...intrinsic?.icon} />
        ) : content.startsWith("http") ? (
          // TODO Fix width-height
          // eslint-disable-next-line qwik/jsx-img
          <img
            decoding="async"
            loading="lazy"
            src={content}
            {...inject(intrinsic?.image, { class: styles.image })}
          />
        ) : (
          content
        )}
      </div>
    );
  }
);
