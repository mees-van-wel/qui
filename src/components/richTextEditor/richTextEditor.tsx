import {
  component$,
  useSignal,
  useVisibleTask$,
  type NoSerialize,
  noSerialize,
  useId,
  useOnDocument,
  $,
  useTask$,
} from "@builder.io/qwik";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { Button } from "../button";
import { Group } from "../group";
import { Stack } from "../stack";
import { TextInput } from "../textInput";
import { isBrowser } from "@builder.io/qwik/build";
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBlockquote,
  IconBold,
  IconClearFormatting,
  IconDots,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconItalic,
  IconLink,
  IconLinkOff,
  IconList,
  IconListNumbers,
  IconStrikethrough,
  IconUnderline,
  InputWrapper,
  type InputWrapperProps,
} from "~/internal";
import clsx from "clsx";
import commonStyles from "~/common.module.scss";
import styles from "./richTextEditor.module.scss";
import { Popover } from "../popover";

export type RichTextEditorProps = InputWrapperProps & {
  value?: string;
  onChange$?: (value: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
};

export const RichTextEditor = component$<RichTextEditorProps>(
  ({
    label,
    description,
    error,
    required,
    disabled,
    value,
    onChange$,
    autoFocus,
    placeholder,
  }) => {
    const editor = useSignal<NoSerialize<Editor>>();
    const randomId = useId();
    const anchorPopupOpen = useSignal(false);
    const popupRef = useSignal<HTMLElement>();
    const hrefValue = useSignal("");
    const rootRef = useSignal<HTMLElement>();

    const initEditor = $(() => {
      editor.value = noSerialize(
        new Editor({
          autofocus: autoFocus ? "end" : undefined,
          element: rootRef.value,
          onFocus: () => {
            const element = document.querySelector(
              `.${styles.root}`,
            ) as Element;
            element.className = clsx(
              ...Array.from(element.classList),
              "border-primary-6 dark:border-primary-8",
            );
          },
          onBlur: () => {
            const element = document.querySelector(
              `.${styles.root}`,
            ) as Element;
            element.classList.remove(
              "border-primary-6",
              "dark:border-primary-8",
            );
            element.classList.add("border-transparent");
          },
          onUpdate: ({ editor }) => {
            const rawValue = editor.getHTML();
            const newValue = /^<\w+[^>]*>(?:\s*|\n*)<\/\w+>$/.test(rawValue)
              ? ""
              : rawValue;
            if (newValue !== value && onChange$) onChange$(newValue);
          },
          extensions: [
            StarterKit,
            Link,
            Placeholder.configure({
              placeholder,
            }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Underline,
          ],
          content: value || "<p></p>",
          editorProps: {
            attributes: {
              id: randomId,
            },
          },
        }),
      );
    });

    useTask$(() => {
      if (isBrowser && !disabled) setTimeout(initEditor, 500);
    });

    useVisibleTask$(({ track }) => {
      track(() => disabled);
      editor.value?.destroy();
      if (!disabled) initEditor();
    });

    useVisibleTask$(({ track }) => {
      track(() => value);

      if (disabled) return;

      const newValue = value || "<p></p>";
      if (editor.value?.getHTML() !== newValue)
        editor.value?.commands.setContent(newValue);
    });

    useOnDocument(
      "mousedown",
      $((e) => {
        if (
          !disabled &&
          popupRef.value &&
          e.target &&
          !popupRef.value.contains(e.target as Node)
        )
          anchorPopupOpen.value = false;
      }),
    );

    return (
      <InputWrapper
        inputId={randomId}
        label={label}
        description={description}
        error={error}
        required={required}
        disabled={disabled}
      >
        {disabled ? (
          <div
            dangerouslySetInnerHTML={value}
            class={clsx(
              styles.root,
              styles["root--disabled"],
              commonStyles.input,
            )}
          />
        ) : (
          <div class="rounded bg-midground p-4">
            <Stack gap="sm">
              <Group gap="sm">
                <Button.Group>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().toggleBold().run();
                    }}
                    size="xs"
                  >
                    <IconBold />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().toggleItalic().run();
                    }}
                    size="xs"
                  >
                    <IconItalic />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().toggleUnderline().run();
                    }}
                    size="xs"
                  >
                    <IconUnderline />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().toggleStrike().run();
                    }}
                    size="xs"
                  >
                    <IconStrikethrough />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value
                        ?.chain()
                        .focus()
                        .clearNodes()
                        .unsetAllMarks()
                        .run();
                    }}
                    size="xs"
                  >
                    <IconClearFormatting />
                  </Button>
                </Button.Group>
                <Button.Group>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value
                        ?.chain()
                        .focus()
                        .toggleHeading({ level: 1 })
                        .run();
                    }}
                    size="xs"
                  >
                    <IconH1 />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value
                        ?.chain()
                        .focus()
                        .toggleHeading({ level: 2 })
                        .run();
                    }}
                    size="xs"
                  >
                    <IconH2 />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value
                        ?.chain()
                        .focus()
                        .toggleHeading({ level: 3 })
                        .run();
                    }}
                    size="xs"
                  >
                    <IconH3 />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value
                        ?.chain()
                        .focus()
                        .toggleHeading({ level: 4 })
                        .run();
                    }}
                    size="xs"
                  >
                    <IconH4 />
                  </Button>
                </Button.Group>
                <Button.Group>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().toggleBlockquote().run();
                    }}
                    size="xs"
                  >
                    <IconBlockquote />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value
                        ?.chain()
                        .focus()
                        .insertContent("<hr />")
                        .run();
                    }}
                    size="xs"
                  >
                    <IconDots />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().toggleBulletList().run();
                    }}
                    size="xs"
                  >
                    <IconList />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().toggleOrderedList().run();
                    }}
                    size="xs"
                  >
                    <IconListNumbers />
                  </Button>
                </Button.Group>
                <Button.Group>
                  <Popover
                    signal={anchorPopupOpen}
                    trigger={
                      <Button class={styles.button} size="xs">
                        <IconLink />
                      </Button>
                    }
                  >
                    <Group gap="sm">
                      <TextInput
                        autoFocus
                        value={hrefValue.value}
                        onChange$={(value) => {
                          hrefValue.value = value;
                        }}
                        // TODO Retrive from context
                        placeholder="https://example.com"
                      />
                      <Button
                        disabled={!hrefValue.value}
                        size="sm"
                        onClick$={() => {
                          editor.value
                            ?.chain()
                            .focus()
                            .setLink({
                              href: hrefValue.value,
                              target: "_blank",
                            })
                            .run();

                          hrefValue.value = "";
                          anchorPopupOpen.value = false;
                        }}
                      >
                        {/* TODO Retrive from context  */}
                        Save
                      </Button>
                    </Group>
                  </Popover>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().unsetLink().run();
                    }}
                    size="xs"
                  >
                    <IconLinkOff />
                  </Button>
                </Button.Group>
                <Button.Group>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().setTextAlign("left").run();
                    }}
                    size="xs"
                  >
                    <IconAlignLeft />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value
                        ?.chain()
                        .focus()
                        .setTextAlign("center")
                        .run();
                    }}
                    size="xs"
                  >
                    <IconAlignCenter />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value
                        ?.chain()
                        .focus()
                        .setTextAlign("justify")
                        .run();
                    }}
                    size="xs"
                  >
                    <IconAlignJustified />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().setTextAlign("right").run();
                    }}
                    size="xs"
                  >
                    <IconAlignRight />
                  </Button>
                </Button.Group>
                <Button.Group>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().undo().run();
                    }}
                    size="xs"
                  >
                    <IconArrowBackUp />
                  </Button>
                  <Button
                    class={styles.button}
                    onClick$={() => {
                      editor.value?.chain().focus().redo().run();
                    }}
                    size="xs"
                  >
                    <IconArrowForwardUp />
                  </Button>
                </Button.Group>
              </Group>
              <div
                ref={rootRef}
                class={clsx(
                  styles.root,
                  {
                    [commonStyles["input--error"]]: error,
                  },
                  commonStyles.input,
                )}
              />
            </Stack>
          </div>
        )}
      </InputWrapper>
    );
  },
);
