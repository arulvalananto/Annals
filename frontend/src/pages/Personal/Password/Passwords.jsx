import React from 'react';
import { useSelector } from 'react-redux';

import Password from './Password';
import { selectPasswords } from '../../../store/reducers/personal.reducer';

const HEADERS = ['No', 'Name', 'Username', 'Password', 'Actions'];

const Passwords = ({ handleDeleteMode }) => {
    const passwords = useSelector(selectPasswords);

    return (
        <>
            {passwords.length > 0 && (
                <div className="bg-mildgray flex items-center justify-between p-3 rounded-sm mb-5 text-xs md:text-md lg:text-lg">
                    {HEADERS.map((header, index) => (
                        <p
                            className={`flex-1 text-center ${
                                header === 'No' ? 'hidden md:block' : ''
                            }`}
                            key={index}
                        >
                            {header}
                        </p>
                    ))}
                </div>
            )}
            {passwords.map((password, index) => (
                <Password
                    password={password}
                    index={index}
                    key={index}
                    handleDeleteMode={handleDeleteMode}
                />
            ))}
        </>
    );
};

export default Passwords;
