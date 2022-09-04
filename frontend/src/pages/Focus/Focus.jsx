import React, { useState } from 'react';
import moment from 'moment';
import { FilterTiltShift } from '@mui/icons-material';

const Focus = ({ doc: { date, agenda } }) => {
    const [isShrink, setIsShrink] = useState(true);

    const handleShrink = () => setIsShrink(!isShrink);

    return (
        <div className="flex gap-2 mb-4">
            <div>
                <p
                    className="text-xl text-gray-600 font-bold cursor-pointer select-none"
                    onClick={handleShrink}
                >
                    {moment(date).format('MMM Do YYYY')}
                </p>
                {isShrink && (
                    <ul className="select-none">
                        {agenda.map((agendum) => (
                            <li className="ml-8 mt-2 flex items-center">
                                <FilterTiltShift />{' '}
                                <span className="ml-3">{agendum}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Focus;
