import {
  useSignal,
  type QRL,
  type Tracker,
  useVisibleTask$,
} from "@builder.io/qwik";

type CleanupFn = () => void;
type Fn = QRL<() => CleanupFn | void>;

export const useUpdateTask = (
  tracker: QRL<(track: Tracker) => void>,
  fn: Fn,
) => {
  const mounted = useSignal(false);

  useVisibleTask$(async ({ track, cleanup }) => {
    await tracker(track);

    if (!mounted.value) {
      mounted.value = true;
      return;
    }

    const cleanupFn = await fn();

    if (cleanupFn) cleanup(cleanupFn);
  });
};
