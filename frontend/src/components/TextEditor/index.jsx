import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import { MESSAGES } from '../../utils/constants';
import { addJournal, updateJournal } from '../../store/actions/journals.action';

const TextEditor = ({ mode = '', contentText = '', id = '' }) => {
    const { push } = useHistory();
    const dispatch = useDispatch();

    const [content, setContent] = useState(contentText);
    const { isLoading } = useSelector((state) => state.loader);

    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleChange = (e) => setContent(e.target.value);

    const handleUpdate = (e) => {
        e.preventDefault();
        if (content.trim() === contentText)
            return toast.error(MESSAGES.CONTENT_ERROR);
        dispatch(updateJournal(content, id, push));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addJournal(content, push));
    };

    return (
        <form onSubmit={mode === 'edit' ? handleUpdate : handleSubmit}>
            <textarea
                className={`custom-text-editor ${mode && 'h-screen'}`}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                value={content}
                placeholder="Type here.."
                autoFocus
                disabled={mode === 'view'}
            />
            {mode !== 'view' &&
            content.trim().length > 0 &&
            content.trim() !== contentText ? (
                <button
                    type="submit"
                    className="custom-text-editor-submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <CircularProgress size="20px" color="inherit" />
                    ) : (
                        `${mode === 'edit' ? 'Update' : 'Submit'}`
                    )}
                </button>
            ) : null}
        </form>
    );
};

export default React.memo(TextEditor);
