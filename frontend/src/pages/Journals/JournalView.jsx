import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';

import { ROUTES } from '../../utils/routes';
import TextEditor from '../../components/TextEditor';
import BackButton from '../../components/BackButton';

const JournalView = () => {
    const { id } = useParams();
    const { push } = useHistory();
    const { docs, synced } = useSelector((state) => state.journals);

    const journal = docs.filter((journal) => journal.id === id)[0];

    if (!synced) push(ROUTES.JOURNALS);

    return (
        <div className="p-5 h-full w-full">
            <BackButton />
            <div className="mt-10 mb-4">
                <h2 className="md:text-5xl text-3xl font-bold select-none">
                    {moment(journal?.date).format('LL')}
                </h2>
            </div>
            <TextEditor mode="view" contentText={journal.content} />
        </div>
    );
};

export default JournalView;
