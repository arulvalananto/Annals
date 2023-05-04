import React from 'react';
import {
    Add,
    History,
    Home as HomeIcon,
    ImportContacts,
    Lock,
    WbIncandescent,
    Task,
} from '@mui/icons-material';

import Home from '../pages/Home/Home';
const FocusHistory = React.lazy(() => import('../pages/Focus/FocusHistory'));
const Journals = React.lazy(() => import('../pages/Journals/Journals'));
const JournalAdd = React.lazy(() => import('../pages/Journals/JournalAdd'));
const JournalEdit = React.lazy(() => import('../pages/Journals/JournalEdit'));
const JournalView = React.lazy(() => import('../pages/Journals/JournalView'));
const Ideas = React.lazy(() => import('../pages/Idea/Ideas'));
const Tasks = React.lazy(() => import('../pages/Task/Tasks'));

export const ROUTES = {
    DEFAULT: '/',
    404: '/404',
    WELCOME: '/welcome',
    SETTINGS: '/settings',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    FORGOT_PASSWORD: '/forgot-password',
    MASTER_PASSWORD: '/master-password',
    JOURNALS: '/journals',
    JOURNAL_VIEW: '/journals/view',
    JOURNAL_EDIT: '/journals/edit',
    JOURNAL_ADD: '/journals/add',
    IDEAS: '/ideas',
    TASKS: '/tasks',
    FOCUS: '/focus/log',
};

export const MESSAGES = {
    SAMPLE: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis repellendus veniam perspiciatis atque vel eveniet ea suscipit. Doloremque, accusamus, consequatur voluptatibus voluptate quas quos impedit obcaecati, aperiam a quae quia!',
    NOT_FOUND: {
        TITLE: 'Page not found',
        DESCRIPTION:
            'The page you are looking for might have been removed had its name changed or is temporarily unavailable.',
    },
    DELETE_CONFIRMATION:
        'You are going to delete this journal permanently. please confirm',
    SOMETHING_WRONG: 'Something went wrong!',
    LOADER_MESSAGE: 'Please wait for a moment',
    CONTENT_ERROR: 'Same Content cant be updated',
    SIGNUP: {
        TITLE: 'Sign Up',
        SUBTITLE: "Let's start a journey with us",
        DESCRIPTION: 'Write and store your data in a secure way',
    },
    FOCUS: {
        TITLE: 'Focus History',
    },
    NOTHING_FOUND: 'Nothing found 😑',
    JOURNAL: {
        ADD: 'Journal Added',
        UPDATE: 'Journal updated',
    },
    CODE_REQUEST: 'Verification Code Please',
    FORGOT_PASSWORD: 'Forgot Password',
    FORGOT_CHANGE_SUCCESS: 'Password Changed Successfully',
    FORGOT_REQUEST_INFO: 'Your token only valid for 10 minutes',
    LOGO: 'Annals Logo',
    TO_CONTINUE: 'Are You Sure?',
};

export const LINKS = {
    HOME: [
        { Icon: Add, to: ROUTES.JOURNAL_ADD, content: 'create new journal' },
        {
            Icon: Add,
            to: ROUTES.PERSONAL_CREATE,
            content: 'create new personal info',
        },
        { Icon: History, to: ROUTES.FOCUS, content: 'History of focus' },
    ],
};

export const DRAWER_MENU_ITEMS = [
    { to: ROUTES.DEFAULT, Icon: HomeIcon, title: 'Dashboard' },
    { to: ROUTES.JOURNALS, Icon: ImportContacts, title: 'Journals' },
    { to: ROUTES.IDEAS, Icon: WbIncandescent, title: 'Ideas' },
    { to: ROUTES.TASKS, Icon: Task, title: 'Tasks' },
];

export const DASHBOARD_ROUTES = [
    { path: ROUTES.FOCUS, component: FocusHistory },
    { path: `${ROUTES.JOURNAL_VIEW}/:id`, component: JournalView },
    { path: `${ROUTES.JOURNAL_EDIT}/:id`, component: JournalEdit },
    { path: ROUTES.JOURNAL_ADD, component: JournalAdd },
    { path: ROUTES.JOURNALS, component: Journals },
    { path: ROUTES.IDEAS, component: Ideas },
    { path: ROUTES.TASKS, component: Tasks },
    { path: ROUTES.DEFAULT, component: Home, exact: true },
];
