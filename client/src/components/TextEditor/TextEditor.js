import React from "react";
import "./TextEditor.scss";

const TextEditor = ({ body, changeHandler }) => {
    return (
        <textarea
            value={body}
            onChange={(e) => changeHandler(e.target.value)}
            className="textEditor"
            placeholder="Type Here ..."
        />
    );
};

export default TextEditor;
