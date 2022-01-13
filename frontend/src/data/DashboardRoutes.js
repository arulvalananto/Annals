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
const Passwords = React.lazy(() =>
  import("../pages/Personal/Password/Passwords")
);
const CryptoWallets = React.lazy(() =>
  import("../pages/Personal/Wallet/CryptoWallets")
);
const Cards = React.lazy(() => import("../pages/Personal/Card/Cards"));
const Ideas = React.lazy(() => import("../pages/Idea/Ideas"));
const Tasks = React.lazy(() => import("../pages/Task/Tasks"));

// import Journals from "../pages/Journals";
// import Personal from "../pages/Personal";
// import Ideas from "../pages/Ideas";
// import Tasks from "../pages/Tasks";
// import JournalsAdd from "../pages/JournalsAdd";
// import JournalEdit from "../pages/JournalEdit";
// import JournalView from "../pages/JournalView";
// import Cards from "../pages/Cards";
// import Passwords from "../pages/Passwords";
// import CryptoWallets from "../pages/CryptoWallets";
// import PersonalCreate from "../pages/PersonalCreate";

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
