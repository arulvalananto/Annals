import React, { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Assignment,
    Beenhere,
    Clear,
    Done,
    GpsFixed,
    MenuBook,
    Notifications,
} from '@mui/icons-material';

import { greet } from '../../utils/helpers';
import Loader from '../../components/Loader';
import {
    changeFocus,
    fetchDashboardData,
} from '../../store/actions/dashboard.actions';
import { LINKS } from '../../utils/constants';
import IconButton from '../../components/IconButton';
import { toast } from 'react-hot-toast';

const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { synced, docs } = useSelector((state) => state.dashboard);

    const [focus, setFocus] = useState(docs?.focus);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [initialState, setInitialState] = useState(docs?.focus);

    useEffect(() => {
        if (!synced)
            dispatch(
                fetchDashboardData(setInitialLoading, setFocus, setInitialState)
            );
        else setInitialLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnChangeFocusText = (e) => {
        if (e.target.value?.trim()?.length > 50) {
            return;
        }
        setFocus(e.target.value);
    };

    const clearChangeFocus = () => {
        setIsFocusMode(false);
        setFocus(initialState);
    };

    const handleSubmitFocus = () => {
        if (focus.trim().length > 50) {
            toast.error('Focus must be less than 50 characters');
            return;
        }

        setIsFocusMode(false);
        dispatch(changeFocus(focus, setIsLoading, setInitialState));
    };

    if (initialLoading) return <Loader />;

    return (
        <div>
            <div className="h-40 xl:bg-mildgray bg-transparent w-full p-4 sm:px-10 sm:py-8">
                <div className="flex items-center justify-between">
                    <h1 className="sm:text-xl">
                        Good {greet()}, {user.fullName.split(' ')[0]}
                    </h1>
                    <p className="p-2 rounded-full bg-black flex items-center justify-center cursor-pointer">
                        <Notifications fontSize="0.8rem" />
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 place-items-center transform -translate-y-16 p-4">
                <div className="p-5 xl:w-56 w-full h-32 bg-primary text-white rounded select-none col-span-1">
                    <Beenhere />
                    <h1 className="capitalize mt-2 text-sm">No of Days used</h1>
                    <p className="text-2xl mt-1">{docs.days}</p>
                </div>
                <div className="p-5 xl:w-56 w-full h-32 bg-secondary text-white rounded select-none col-span-1">
                    <MenuBook />
                    <h1 className="capitalize mt-2 text-sm">
                        No of journals written
                    </h1>
                    <p className="text-2xl mt-1">{docs.journals}</p>
                </div>
                <div className="p-5 xl:w-56 w-full h-32 bg-tertiary text-black rounded select-none col-span-1">
                    <Assignment />
                    <h1 className="capitalize mt-2 text-sm">Pending Tasks</h1>
                    <p className="text-2xl mt-1">{docs.tasks}</p>
                </div>
                <div className="p-5 xl:w-56 w-full h-32 bg-moderate text-black rounded col-span-1">
                    <h1 className="capitalize text-lg flex items-center gap-3 select-none">
                        Today's Focus{' '}
                        {!isFocusMode ? (
                            <Tooltip title="Change Focus" placement="top">
                                <GpsFixed
                                    onClick={() => {
                                        !isLoading && setIsFocusMode(true);
                                    }}
                                    className="cursor-pointer"
                                />
                            </Tooltip>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Tooltip title="clear focus" placement="top">
                                    <div onClick={clearChangeFocus}>
                                        <IconButton
                                            Icon={Clear}
                                            fontSize="0.8rem"
                                        />
                                    </div>
                                </Tooltip>
                                <Tooltip title="set focus" placement="top">
                                    <div onClick={handleSubmitFocus}>
                                        <IconButton
                                            Icon={Done}
                                            fontSize="0.8rem"
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                        )}
                    </h1>
                    <div className="relative w-100 h-100">
                        <textarea
                            className="text-sm mt-1 overflow-scroll h-16 cursor-pointer bg-transparent w-full select-none p-1 placeholder-black border-none border-2 focus:border-black outline-none"
                            value={focus}
                            placeholder="-"
                            onChange={handleOnChangeFocusText}
                            disabled={!isFocusMode}
                        />
                        <p
                            className={`absolute bottom-0 right-0 text-xs ${
                                !isFocusMode && 'hidden'
                            }`}
                        >
                            {focus?.trim()?.length} / 50
                        </p>
                    </div>
                </div>
            </div>
            <div className="px-5 flex flex-col gap-3 mb-4">
                {LINKS.HOME.map(({ to, content, Icon }, index) => (
                    <Link
                        key={index}
                        to={to}
                        className="flex items-center p-3 rounded bg-mildgray gap-3"
                    >
                        <Icon />
                        <span>{content}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
