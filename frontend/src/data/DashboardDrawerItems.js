import {
    Home as HomeIcon,
    ImportContacts,
    Lock,
    WbIncandescent,
    Task,
} from '@mui/icons-material';
import { ROUTES } from '../utils/routes';

const menuItems = [
    { to: ROUTES.DEFAULT, Icon: HomeIcon, title: 'Dashboard' },
    { to: ROUTES.JOURNALS, Icon: ImportContacts, title: 'Journals' },
    { to: ROUTES.PERSONAL, Icon: Lock, title: 'Personal' },
    { to: ROUTES.IDEAS, Icon: WbIncandescent, title: 'Ideas' },
    { to: ROUTES.TASKS, Icon: Task, title: 'Tasks' },
];

export default menuItems;
