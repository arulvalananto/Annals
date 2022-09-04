import { Add, History } from '@mui/icons-material';
import { ROUTES } from './routes';

export const MESSAGES = {
    WELCOME: {
        DESCRIPTION:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis repellendus veniam perspiciatis atque vel eveniet ea suscipit. Doloremque, accusamus, consequatur voluptatibus voluptate quas quos impedit obcaecati, aperiam a quae quia!',
    },
    NOT_FOUND: {
        TITLE: 'Page not found',
        DESCRIPTION:
            'The page you are looking for might have been removed had its name changed or is temporarily unavailable.',
    },
    DELETE_CONFIRMATION:
        'You are going to delete this journal permanently. please confirm',
    SOMETHING_WRONG: 'Something went wrong!',
    LOADER_MESSAGE: 'Please wait for a moment',
    CONTENT_ERROR: 'Same Content cant be updated',
    SIGNUP: {
        TITLE: "Let's start a journey with us",
        DESCRIPTION: 'Write and store your data in a secure way',
    },
    FOCUS: {
        TITLE: 'Focus History',
    },
    NOTHING_FOUND: 'Nothing found 😑',
    JOURNAL: {
        ADD: 'Journal Added',
        UPDATE: 'Journal updated',
    },
};

export const homeLinks = [
    { Icon: Add, to: ROUTES.JOURNAL_ADD, content: 'create new journal' },
    {
        Icon: Add,
        to: ROUTES.PERSONAL_CREATE,
        content: 'create new personal info',
    },
    { Icon: History, to: ROUTES.FOCUS, content: 'History of focus' },
];

export const personalLinks = [
    { title: 'Passwords', name: 'passwords', color: 'primary' },
    { title: 'Crypto Wallets', name: 'cryptoWallets', color: 'secondary' },
    { title: 'Cards', name: 'cards', color: 'tertiary' },
];

export const initialState = {
    idea: { title: '', content: '' },
};

export const passwordHeaders = [
    'No',
    'Name',
    'Username',
    'Password',
    'Actions',
];

export const viewPasswordInputs = [
    { name: 'createdAt', label: 'created at' },
    { name: 'updatedAt', label: 'modified at' },
];

export const walletRows = [
    { title: 'private address', select: 'privateAddress' },
    { title: 'pass phrase', select: 'passPhrase' },
];
