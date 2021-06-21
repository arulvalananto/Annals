import React, { useState } from "react";
import "./Idea.scss";

import randomColor from "../../../utils/randomColor";

import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

const Idea = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="idea">
      <form className="idea__middle">
        <div className="idea__middleContainer">
          <input
            type="text"
            placeholder="Add Idea (Title)"
            className="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            sd
          />
          <BsArrowRight
            style={{ display: `${title && content ? "block" : "none"}` }}
            className="addButton"
            size="20"
          />
        </div>
        <textarea
          style={{ display: `${title ? "block" : "none"}` }}
          className="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Type Your Idea"
        />
      </form>
      <div className="idea__footer">
        <div
          className="idea__footerCard"
          style={{ borderLeft: `3px solid ${randomColor()}` }}
        >
          <span className="idea__footerCardContent">
            <h4 className="title">React</h4>
            <p>
              jdhiudbsni iudvnuiunv iusdiugu ndfskljkl n iuniundgn jignigankdng
              hh
            </p>
          </span>
          <div className="idea__footerCardTools">
            <span className="edit">
              <FiEdit2 />
            </span>
            <span className="delete">
              <AiOutlineDelete />
            </span>
          </div>
        </div>
        <div
          className="idea__footerCard"
          style={{ borderLeft: `3px solid ${randomColor()}` }}
        >
          <span className="idea__footerCardContent">
            <p>sgdiuiouuuuuuuuuuuuiosdnvoisdniondsvon noisdnogin igsndih</p>
          </span>
          <div className="idea__footerCardTools">
            <span className="edit">
              <FiEdit2 />
            </span>
            <span className="delete">
              <AiOutlineDelete />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Idea;
