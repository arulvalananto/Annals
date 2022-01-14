import React from "react";

import Home from "../pages/Home/Home";
const Journals = React.lazy(() => import("../pages/Journals/Journals"));
const JournalAdd = React.lazy(() => import("../pages/Journals/JournalAdd"));
const JournalEdit = React.lazy(() => import("../pages/Journals/JournalEdit"));
const JournalView = React.lazy(() => import("../pages/Journals/JournalView"));
const Personal = React.lazy(() => import("../pages/Personal/Personal"));
const PersonalCreate = React.lazy(() =>
  import("../pages/Personal/PersonalCreate")
);
const Passwords = React.lazy(() => import("../pages/Personal/Password"));
const CryptoWallets = React.lazy(() => import("../pages/Personal/Wallet"));
const Cards = React.lazy(() => import("../pages/Personal/Card"));
const Ideas = React.lazy(() => import("../pages/Idea/Ideas"));
const Tasks = React.lazy(() => import("../pages/Task/Tasks"));

const routes = [
  { path: "/journals/view/:id", component: JournalView },
  { path: "/journals/edit/:id", component: JournalEdit },
  { path: "/journals/add", component: JournalAdd },
  {
    path: "/journals",
    component: Journals,
  },
  { path: "/personal/create", component: PersonalCreate },
  { path: "/personal/passwords", component: Passwords },
  { path: "/personal/crypto-wallet", component: CryptoWallets },
  { path: "/personal/cards", component: Cards },
  { path: "/personal", component: Personal },
  { path: "/ideas", component: Ideas },
  { path: "/tasks", component: Tasks },
  {
    path: "/",
    component: Home,
    exact: true,
  },
];

export default routes;
