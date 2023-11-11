import { component$, Slot, CSSProperties } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik/jsx-runtime";
import { CloseIcon, QuiColor, getColor } from "~/internal";
import clsx from "clsx";
import classes from "./notification.module.scss";
import { Group } from "../group";
import { Loader } from "../loader";

// const ICON_MAP: Record<NotificationVariant, JSX.Element> = {
//   info: <IconInfoCircle class="w-4 text-white" />,
//   success: <IconCheck class="w-4 text-white" />,
//   warning: <IconAlertTriangle class="w-4 text-white" />,
//   error: <IconX class="w-4 text-white" />,
// };

export type NotificationStyles = {
  root?: CSSProperties;
  iconWrapper?: CSSProperties;
  loader?: CSSProperties;
  title?: string;
  closeIcon?: CSSProperties;
};

export type NotificationClassnames = {
  root?: string;
  iconWrapper?: string;
  loader?: string;
  title?: string;
  closeIcon?: string;
};

export type NotificationProps = {
  styles?: NotificationStyles;
  classNames?: NotificationClassnames;
  title?: string;
  color?: QuiColor;
  icon?: JSX.Element;
  loading?: boolean;
  onClose$?: () => void;
};

export const Notification = component$<NotificationProps>(
  ({ styles, classNames, title, color, icon, loading, onClose$ }) => (
    <div
      style={{
        ...getColor(color),
        ...styles?.root,
      }}
      class={clsx(classes.root, classNames?.root)}
    >
      <Group
        gap="xs"
        style={{
          paddingRight: onClose$ ? "1.5rem" : undefined,
        }}
      >
        {(icon || loading) && (
          <div
            style={styles?.iconWrapper}
            class={clsx(classes["root__icon-wrapper"], classNames?.iconWrapper)}
          >
            {loading ? <Loader color="current" /> : icon}
          </div>
        )}
        {title ? (
          <p
            style={styles?.title}
            class={clsx(classes["root__title"], classNames?.title)}
          >
            {title}
          </p>
        ) : (
          <Slot />
        )}
      </Group>
      {title && <Slot />}
      {onClose$ && (
        <CloseIcon
          style={styles?.closeIcon}
          class={classNames?.closeIcon}
          onClick$={onClose$}
        />
      )}
    </div>
  )
);
