import React from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const BackButton = () => {
    const { goBack } = useHistory();

    return (
        <button
            className="p-2 bg-tertiary flex items-center justify-center w-10 h-10 text-black rounded transform cursor-pointer hover:scale-90 "
            onClick={() => goBack()}
        >
            <ArrowBackIosIcon
                className="transform translate-x-1"
                fontSize="small"
            />
        </button>
    );
};

export default React.memo(BackButton);
