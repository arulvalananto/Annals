import Home from "../pages/Home";
import Journals from "../pages/Journals";
import Personals from "../pages/Personals";
import Ideas from "../pages/Ideas";
import Tasks from "../pages/Tasks";
import JournalsAdd from "../pages/JournalsAdd";
import JournalEdit from "../pages/JournalEdit";
import JournalView from "../pages/JournalView";
import Cards from "../pages/Cards";
import Passwords from "../pages/Personals";
import CryptoWallets from "../pages/CryptoWallets";

const routes = [
  { path: "/journals/view/:id", component: JournalView },
  { path: "/journals/edit/:id", component: JournalEdit },
  { path: "/journals/add", component: JournalsAdd },
  {
    path: "/journals",
    component: Journals,
  },
  { path: "/personals", component: Personals },
  { path: "/passwords", component: Passwords },
  { path: "/cryptocurrencies", component: CryptoWallets },
  { path: "/cards", component: Cards },
  { path: "/ideas", component: Ideas },
  { path: "/tasks", component: Tasks },
  {
    path: "/",
    component: Home,
  },
];

export default routes;
