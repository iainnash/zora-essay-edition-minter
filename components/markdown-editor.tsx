import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

export const MarkdownEditor = dynamic(
  // @ts-ignore
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
) as any;
