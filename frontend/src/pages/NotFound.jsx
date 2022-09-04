import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../utils/routes';
import { MESSAGES } from '../utils/constants';

const NotFound = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <div></div>
                    <h1 className="notfound-banner">404</h1>
                </div>
                <h2 style={{ color: 'white' }}>{MESSAGES.NOT_FOUND.TITLE}</h2>
                <p>{MESSAGES.NOT_FOUND.DESCRIPTION}</p>
                <Link to={ROUTES.DEFAULT}>home page</Link>
            </div>
        </div>
    );
};

export default NotFound;
