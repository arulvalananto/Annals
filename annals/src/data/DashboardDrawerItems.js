import {
  Home as HomeIcon,
  ImportContacts,
  Lock,
  WbIncandescent,
  Task,
} from "@mui/icons-material";

const menuItems = [
  { to: "/", Icon: HomeIcon, title: "Home" },
  { to: "/journals", Icon: ImportContacts, title: "Journals" },
  { to: "/personals", Icon: Lock, title: "Personals" },
  { to: "/ideas", Icon: WbIncandescent, title: "Ideas" },
  { to: "/tasks", Icon: Task, title: "Tasks" },
];

export default menuItems;
