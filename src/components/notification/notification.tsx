import { component$, Slot, QwikIntrinsicElements } from "@builder.io/qwik";
import type { JSX } from "@builder.io/qwik/jsx-runtime";
import {
  CloseIcon,
  type CloseIconProps,
  QuiColor,
  getColor,
  inject,
} from "~/internal";
import styles from "./notification.module.scss";
import { Group, GroupProps } from "../group";
import { Loader, LoaderProps } from "../loader";

// const ICON_MAP: Record<NotificationVariant, JSX.Element> = {
//   info: <IconInfoCircle class="w-4 text-white" />,
//   success: <IconCheck class="w-4 text-white" />,
//   warning: <IconAlertTriangle class="w-4 text-white" />,
//   error: <IconX class="w-4 text-white" />,
// };

export type NotificationIntrinsic = {
  iconWrapper?: QwikIntrinsicElements["div"];
  header?: GroupProps;
  loader?: LoaderProps;
  title?: QwikIntrinsicElements["p"];
  closeIcon?: CloseIconProps;
};

export type NotificationProps = QwikIntrinsicElements["div"] & {
  intrinsic?: NotificationIntrinsic;
  title?: string;
  color?: QuiColor;
  icon?: JSX.Element;
  loading?: boolean;
  onClose$?: () => void;
};

export const Notification = component$<NotificationProps>(
  ({ intrinsic, title, color, icon, loading, onClose$, ...props }) => (
    <div
      {...inject(props, {
        style: getColor(color),
        class: styles.root,
      })}
    >
      <Group
        gap="xs"
        {...inject(intrinsic?.header, {
          style: {
            paddingRight: onClose$ ? "1.5rem" : undefined,
          },
        })}
      >
        {(icon || loading) && (
          <div
            {...inject(intrinsic?.iconWrapper, {
              class: styles["icon-wrapper"],
            })}
          >
            {loading ? <Loader color="current" {...intrinsic?.loader} /> : icon}
          </div>
        )}
        {title ? (
          <p {...inject(intrinsic?.title, { class: styles.title })}>{title}</p>
        ) : (
          <Slot />
        )}
      </Group>
      {title && <Slot />}
      {onClose$ && (
        <CloseIcon {...inject(intrinsic?.closeIcon, { onClick$: onClose$ })} />
      )}
    </div>
  )
);
