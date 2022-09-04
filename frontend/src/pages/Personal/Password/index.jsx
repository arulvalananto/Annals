import React from 'react';

import Passwords from './Passwords';
import PersonalTemplate from '../Template';

const PasswordTemplate = () => {
    return (
        <PersonalTemplate
            value="passwords"
            title="Passwords"
            name="password"
            Component={Passwords}
        />
    );
};

export default PasswordTemplate;
