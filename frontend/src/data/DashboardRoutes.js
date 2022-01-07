import Home from "../pages/Home";
import Journals from "../pages/Journals";
import Personal from "../pages/Personal";
import Ideas from "../pages/Ideas";
import Tasks from "../pages/Tasks";
import JournalsAdd from "../pages/JournalsAdd";
import JournalEdit from "../pages/JournalEdit";
import JournalView from "../pages/JournalView";
import Cards from "../pages/Cards";
import Passwords from "../pages/Passwords";
import CryptoWallets from "../pages/CryptoWallets";
import PersonalCreate from "../pages/PersonalCreate";

const routes = [
  { path: "/journals/view/:id", component: JournalView },
  { path: "/journals/edit/:id", component: JournalEdit },
  { path: "/journals/add", component: JournalsAdd },
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
  },
];

export default routes;
