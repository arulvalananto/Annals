import {
  Home as HomeIcon,
  ImportContacts,
  Lock,
  WbIncandescent,
  Task,
} from "@mui/icons-material";

const menuItems = [
  { to: "/", Icon: HomeIcon, title: "Dashboard" },
  { to: "/journals", Icon: ImportContacts, title: "Journals" },
  { to: "/personal", Icon: Lock, title: "Personal" },
  { to: "/ideas", Icon: WbIncandescent, title: "Ideas" },
  { to: "/tasks", Icon: Task, title: "Tasks" },
];

export default menuItems;
