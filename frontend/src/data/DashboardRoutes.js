import React from 'react';

import Home from '../pages/Home/Home';
import { ROUTES } from '../utils/routes';
const FocusHistory = React.lazy(() => import('../pages/Focus/FocusHistory'));
const Journals = React.lazy(() => import('../pages/Journals/Journals'));
const JournalAdd = React.lazy(() => import('../pages/Journals/JournalAdd'));
const JournalEdit = React.lazy(() => import('../pages/Journals/JournalEdit'));
const JournalView = React.lazy(() => import('../pages/Journals/JournalView'));
const Personal = React.lazy(() => import('../pages/Personal/Personal'));
const Passwords = React.lazy(() => import('../pages/Personal/Password'));
const Cards = React.lazy(() => import('../pages/Personal/Card'));
const CardView = React.lazy(() => import('../pages/Personal/Card/CardView'));
const CryptoWallets = React.lazy(() => import('../pages/Personal/Wallet'));
const Ideas = React.lazy(() => import('../pages/Idea/Ideas'));
const Tasks = React.lazy(() => import('../pages/Task/Tasks'));
const ViewPassword = React.lazy(() =>
    import('../pages/Personal/Password/ViewPassword')
);
const PersonalCreate = React.lazy(() =>
    import('../pages/Personal/PersonalCreate')
);

const routes = [
    { path: ROUTES.FOCUS, component: FocusHistory },
    { path: `${ROUTES.JOURNAL_VIEW}/:id`, component: JournalView },
    { path: `${ROUTES.JOURNAL_EDIT}/:id`, component: JournalEdit },
    { path: ROUTES.JOURNAL_ADD, component: JournalAdd },
    { path: ROUTES.JOURNALS, component: Journals },
    { path: ROUTES.PERSONAL_CREATE, component: PersonalCreate },
    { path: `${ROUTES.PERSONAL_PASSWORD_VIEW}/:id`, component: ViewPassword },
    { path: ROUTES.PERSONAL_PASSWORDS, component: Passwords },
    { path: ROUTES.PERSONAL_WALLETS, component: CryptoWallets },
    { path: `${ROUTES.PERSONAL_CARDS}/:id`, component: CardView },
    { path: ROUTES.PERSONAL_CARDS, component: Cards },
    { path: ROUTES.PERSONAL, component: Personal },
    { path: ROUTES.IDEAS, component: Ideas },
    { path: ROUTES.TASKS, component: Tasks },
    { path: ROUTES.DEFAULT, component: Home, exact: true },
];

export default routes;
