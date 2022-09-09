import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';
import Drawer from '../Drawer';
import { updateIdea } from '../../store/actions/ideas.action';

const UpdateIdeaDrawer = ({ selectedId }) => {
    const { docs } = useSelector((state) => state.ideas);
    const dispatch = useDispatch();

    const selectedIdea = docs.find((idea) => idea.id === selectedId);
    const [idea, setIdea] = useState({
        title: selectedIdea?.title,
        content: selectedIdea?.content,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIdea({ ...idea, [name]: value });
    };

    const handleUpdate = () => dispatch(updateIdea(selectedId, idea));

    return (
        <Drawer
            Icon={EditIcon}
            fontSize="14px"
            className="drawer"
            onSubmit={handleUpdate}
        >
            <h3 className="title">Update Idea</h3>
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="title" className="label">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={idea.title}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content" className="label">
                        Content
                    </label>
                    <textarea
                        className="resize-none input"
                        value={idea.content}
                        name="content"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </Drawer>
    );
};

export default React.memo(UpdateIdeaDrawer);
