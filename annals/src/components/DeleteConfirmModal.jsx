import React from "react";
import { DeleteOutlineSharp } from "@mui/icons-material";

import Modal from "../components/Modal";

const DeleteConfirmModal = ({ yes, no, visible }) => {
  return (
    <Modal onClose={no} visible={visible}>
      <div>
        <DeleteOutlineSharp fontSize="large" className="mb-3" />
        <h1 className="text-xl">Are You Sure?</h1>
        <p className="text-xs text-gray-400 mt-3">
          You are going to delete this journal permanently. please confirm
        </p>
        <div className="flex mt-5 text-sm">
          <button
            className="px-4 py-2 bg-bgdark rounded shadow"
            type="button"
            onClick={no}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-primary ml-2 rounded shadow"
            type="button"
            onClick={yes}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
