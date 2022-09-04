import React from 'react';
import { Link } from 'react-router-dom';
import { HighlightOff, ContentPaste, Visibility } from '@mui/icons-material';

import { ROUTES } from '../../../utils/routes';
import IconButton from '../../../components/IconButton';

const Password = ({
    index,
    handleDeleteMode,
    password: { name, username, password, _id },
}) => {
    return (
        <div className="bg-bgdark flex items-center justify-between p-3 rounded mb-5 text-xs md:text-md lg:text-lg">
            <p className="flex-1 text-center hidden md:block">{index + 1}</p>
            <p className="flex-1 text-center">{name}</p>
            <p className="flex-1 text-center">{username}</p>
            <div className="flex-1 text-center flex items-center justify-center gap-2">
                <input
                    type="password"
                    className="bg-bgdark outline-none select-none w-1/2"
                    value={password}
                    disabled
                />
                <button type="button" className="">
                    <IconButton Icon={ContentPaste} />
                </button>
            </div>
            <div className="flex-1 flex item-center justify-center gap-5">
                <Link to={`${ROUTES.PERSONAL_PASSWORDS}/${_id}`}>
                    <IconButton Icon={Visibility} color="moderate" />
                </Link>
                <button type="button" onClick={() => handleDeleteMode(_id)}>
                    <IconButton Icon={HighlightOff} color="danger" />
                </button>
            </div>
        </div>
    );
};

export default Password;
