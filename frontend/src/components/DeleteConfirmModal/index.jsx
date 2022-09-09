import React from 'react';
import { DeleteOutlineSharp } from '@mui/icons-material';

import './index.css';
import Modal from '../Modal';
import { MESSAGES } from '../../utils/constants';

const DeleteConfirmModal = ({ yes, no, visible }) => {
    return (
        <Modal onClose={no} visible={visible}>
            <div>
                <DeleteOutlineSharp fontSize="large" className="mb-3" />
                <h1 className="text-xl">Are You Sure?</h1>
                <p className="description">{MESSAGES.DELETE_CONFIRMATION}</p>
                <div className="button-container">
                    <button className="cancel" type="button" onClick={no}>
                        Cancel
                    </button>
                    <button className="delete" type="button" onClick={yes}>
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default React.memo(DeleteConfirmModal);
