import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Focus from './Focus';
import Loader from '../../components/Loader';
import { MESSAGES } from '../../utils/constants';
import BackButton from '../../components/BackButton';
import { fetchFocusHistory } from '../../store/actions/dashboard.actions';

const FocusHistory = () => {
    const dispatch = useDispatch();
    const {
        focuses: { docs, synced },
    } = useSelector((state) => state.dashboard);

    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        if (!synced) dispatch(fetchFocusHistory(setInitialLoading));
        else setInitialLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (initialLoading) return <Loader />;

    return (
        <div className="p-2 md:p-5">
            <BackButton />
            <h2 className="font-bold text-3xl my-5 capitalize">
                {MESSAGES.FOCUS.TITLE}
            </h2>
            <div className="">
                {docs.map((doc, index) => (
                    <Focus key={index} doc={doc} />
                ))}
            </div>
        </div>
    );
};

export default FocusHistory;
