import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { MESSAGES } from '../utils/constants';
import { addJournal, updateJournal } from '../store/actions/journals.action';

const TextEditor = ({ mode = '', contentText = '', id = '' }) => {
    const [content, setContent] = useState(contentText);
    const { isLoading } = useSelector((state) => state.loader);

    const { push } = useHistory();
    const dispatch = useDispatch();

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
                className={`w-full bg-transparent bg-bgdark p-2 outline-none rounded resize-none ${
                    mode && 'h-screen'
                }`}
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
                    className="px-4 py-2 bg-secondary rounded transform hover:scale-95 fixed bottom-0 right-0 m-5 sm:m-10 sm:mr-20 select-none disabled: "
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <CircularProgress size="20px" color="inherit" />
                    ) : mode === 'edit' ? (
                        'Update'
                    ) : (
                        'Submit'
                    )}
                </button>
            ) : null}
        </form>
    );
};

export default React.memo(TextEditor);
