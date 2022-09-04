import React from 'react';

import Cards from './Cards';
import PersonalTemplate from '../Template';

const CardTemplate = () => {
    return (
        <PersonalTemplate
            value="cards"
            title="Cards"
            name="card"
            Component={Cards}
        />
    );
};

export default CardTemplate;
