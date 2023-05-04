import toast from 'react-hot-toast';
import moment from 'moment';

export const classNames = (condition, yes, no) => {
    return condition ? yes : no;
};

export const errResponse = (err) => {
    console.log();
    if (err.response) {
        if (err.response.data.message === 'Already Exist') {
            return toast.error(
                'One journal per day, but you can update it anytime! Keep writing!'
            );
        } else {
            return toast.error(err.response.data.message);
        }
    }
    toast.error(err.message);
};
export const greet = () => {
    const currentHour = moment().format('HH');

    if (currentHour >= 3 && currentHour < 12) {
        return 'morning';
    } else if (currentHour >= 12 && currentHour < 15) {
        return 'afternoon';
    } else if (currentHour >= 15 && currentHour < 20) {
        return 'evening';
    } else if (currentHour >= 20 || currentHour < 3) {
        return 'night';
    }
};
