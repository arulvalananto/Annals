import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;

    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (
      <Editor
        toolbar={{
          options: [
            "inline",
            "list",
            "fontSize",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "history",
          ],
          inline: {
            options: ["bold", "italic", "underline"],
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2", "Blockquote"],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          fontSize: {
            options: [16, 18, 24, 30],
            className: "text-black",
            component: undefined,
            dropdownClassName: undefined,
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["unordered", "ordered"],
          },
        }}
        editorState={editorState}
        toolbarClassName="mt-5"
        editorClassName="w-full h-full overflow-y-auto p-1 px-2 rounded mt-2"
        onEditorStateChange={this.onEditorStateChange}
        placeholder="Type Here...."
      />
    );
  }
}
