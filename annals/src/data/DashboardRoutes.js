import Home from "../pages/Home";
import Journals from "../pages/Journals";
import Passwords from "../pages/Passwords";
import Ideas from "../pages/Ideas";
import Tasks from "../pages/Tasks";
import JournalsAdd from "../pages/JournalsAdd";
import JournalEdit from "../pages/JournalEdit";
import JournalView from "../pages/JournalView";

const routes = [
  { path: "/journals/view/:id", component: JournalView },
  { path: "/journals/edit/:id", component: JournalEdit },
  { path: "/journals/add", component: JournalsAdd },
  {
    path: "/journals",
    component: Journals,
  },
  { path: "/passwords", component: Passwords },
  { path: "/ideas", component: Ideas },
  { path: "/tasks", component: Tasks },
  {
    path: "/",
    component: Home,
  },
];

export default routes;
