import React from 'react';

import './index.css';
import { MESSAGES } from '../../utils/constants';

const Loader = () => {
    return <div className="loader">{MESSAGES.LOADER_MESSAGE}</div>;
};

export default React.memo(Loader);
