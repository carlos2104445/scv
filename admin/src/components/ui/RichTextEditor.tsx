"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Code,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useRef } from "react";

interface RichTextEditorProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

export function RichTextEditor({
  name,
  defaultValue = "",
  placeholder = "Write your content here...",
}: RichTextEditorProps) {
  const hiddenRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-brand-orange underline" },
      }),
      ImageExt.configure({
        HTMLAttributes: { class: "rounded-xl max-w-full mx-auto" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[240px] p-4 focus:outline-none",
      },
    },
    onUpdate: ({ editor: e }) => {
      if (hiddenRef.current) {
        hiddenRef.current.value = e.getHTML();
      }
    },
  });

  const addLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    cn(
      "p-1.5 rounded-lg transition-colors",
      active
        ? "bg-brand-orange/10 text-brand-orange"
        : "text-neutral-500 hover:bg-neutral-100 hover:text-brand-dark",
    );

  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-border bg-surface-muted/50">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))} title="Bold">
          <Bold className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))} title="Italic">
          <Italic className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={btn(editor.isActive("code"))} title="Code">
          <Code className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-border mx-1" />

        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))} title="Heading 2">
          <Heading2 className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))} title="Heading 3">
          <Heading3 className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-border mx-1" />

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))} title="Bullet List">
          <List className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))} title="Ordered List">
          <ListOrdered className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive("blockquote"))} title="Quote">
          <Quote className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btn(false)} title="Divider">
          <Minus className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-border mx-1" />

        <button type="button" onClick={addLink} className={btn(editor.isActive("link"))} title="Link">
          <LinkIcon className="w-4 h-4" />
        </button>
        <button type="button" onClick={addImage} className={btn(false)} title="Image">
          <ImageIcon className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-border mx-1" />

        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={cn(btn(false), "disabled:opacity-30")} title="Undo">
          <Undo className="w-4 h-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={cn(btn(false), "disabled:opacity-30")} title="Redo">
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Hidden input to submit HTML as form data */}
      <input ref={hiddenRef} type="hidden" name={name} defaultValue={defaultValue} />
    </div>
  );
}
