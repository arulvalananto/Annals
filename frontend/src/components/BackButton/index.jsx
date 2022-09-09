import React from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import './index.css';

const BackButton = () => {
    const { goBack } = useHistory();

    return (
        <button className="back-button" onClick={() => goBack()}>
            <ArrowBackIosIcon className="back-button-icon" fontSize="small" />
        </button>
    );
};

export default React.memo(BackButton);
