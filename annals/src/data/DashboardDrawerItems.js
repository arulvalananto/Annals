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
  { to: "/passwords", Icon: Lock, title: "Passwords" },
  { to: "/ideas", Icon: WbIncandescent, title: "Ideas" },
  { to: "/tasks", Icon: Task, title: "Tasks" },
];

export default menuItems;
