import { ImageResize } from "quill-image-resize-module-ts";
import { useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import { client } from "../../lib/apollo";
import { UPLOAD_IMAGE } from "../../lib/apollo/post";
import { loadingStore } from "../../store";

Quill.register("modules/imageResize", ImageResize);

export interface IQuillEditorProps {
  setContent: Function
}

export default function QuillEditor({setContent}: IQuillEditorProps) {
  const setIsLoading = loadingStore((state) => state.setIsLoading);
  const editorRef = useRef<any>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      setIsLoading(true);
      const file = input.files?.[0];
      const {data: {UploadImage}} = await client.mutate({
        mutation: UPLOAD_IMAGE,
        variables: {file}
      });
      setIsLoading(false);
      console.log(UploadImage);
      insertToEditor(UploadImage);
    };
  };

  const insertToEditor = (url:string) => {
    const editor = editorRef.current?.getEditor();

    editor?.insertEmbed(editor.getSelection()?.index, "image", url);
  }

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      onChange={(content: string) => setContent(content)}
      ref={editorRef}
    />
  );
}
