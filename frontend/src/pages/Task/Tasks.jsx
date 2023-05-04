import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import { AddBoxOutlined, AccessAlarmOutlined } from '@mui/icons-material';

const Tasks = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(false);

    const handleCreate = () => setIsCreateMode(!isCreateMode);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(false);
    };

    return (
        <div className="p-3 sm:p-10">
            <div className="flex flex-wrap gap-4">
                {isCreateMode ? (
                    <form
                        onSubmit={handleSubmit}
                        className={`bg-transparent border-2 border-dashed w-72 h-48 rounded gap-1 text-gray-600 cursor-pointer flex flex-col`}
                    >
                        <input
                            type="date"
                            className="bg-transparent border-none outline-none p-3 text-xs"
                        />
                        <hr className="text-gray-500 px-5" />
                        <textarea
                            className="flex-1 bg-transparent border-none outline-none resize-none p-3"
                            placeholder="Enter description"
                        />
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="bg-secondary py-2 px-4 text-white rounded m-2 text-sm"
                                onClick={handleCreate}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-primary p-2 text-white rounded m-2 text-sm flex-1"
                                disabled={isLoading}
                            >
                                Add
                            </button>
                        </div>
                    </form>
                ) : (
                    <div
                        className={`bg-transparent border-2 border-dashed w-72 h-48 rounded flex items-center justify-center gap-3 text-gray-600 cursor-pointer`}
                        onClick={handleCreate}
                    >
                        <AddBoxOutlined fontSize="large" />
                        <p className="font-bold text-gray-300">Add task</p>
                    </div>
                )}

                <div
                    className={`w-72 h-48 overflow-scroll p-3 text-xs shadow-lg bg-notes-yellow text-black`}
                >
                    <div className="flex items-center justify-between mb-3">
                        <Tooltip title="Due date">
                            <div className="p-2 bg-black cursor-pointer text-white rounded flex items-center gap-2">
                                <AccessAlarmOutlined fontSize="small" />{' '}
                                21-10-2023
                            </div>
                        </Tooltip>
                        <input type="checkbox" className="p-2 border-none" />
                    </div>
                    <p className="font-sunrise text-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit nostrum expedita repellat.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
