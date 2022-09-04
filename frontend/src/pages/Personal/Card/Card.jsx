import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';

import { ROUTES } from '../../../utils/routes';
import IconButton from '../../../components/IconButton';
import { ReactComponent as Chip } from '../../../assets/credit-card-chip.svg';

const Card = ({
    card: {
        bankName,
        providerName,
        cardNumber,
        accountHolderName,
        expiry,
        _id,
    },
    handleDeleteMode,
}) => {
    return (
        <div className="relative mt-5 group">
            <div className="absolute -top-7 right-0 flex items-center gap-4 pb-4">
                <Link to={`${ROUTES.PERSONAL_CARDS}/${_id}`}>
                    <IconButton Icon={Edit} color="moderate" />
                </Link>
                <button type="button" onClick={() => handleDeleteMode(_id)}>
                    <IconButton Icon={Delete} color="danger" />
                </button>
            </div>
            <div className="w-full sm:w-80 border-2 h-40 rounded font-jura relative  bg-cover text-white">
                <p className="font-poppins absolute top-2 left-2 uppercase">
                    {bankName || ''}
                </p>
                <p className="uppercase absolute top-2 right-2">
                    {providerName || ''}
                </p>
                <div className="w-12 h-9 absolute top-9 left-2 text-white">
                    <Chip className="text-white" />
                </div>
                <p className="absolute bottom-10 left-2">
                    {cardNumber.slice(0, 4)} {cardNumber.slice(4, 8)}{' '}
                    {cardNumber.slice(8, 12)} {cardNumber.slice(12, 16)}
                </p>
                <p className="absolute bottom-10 right-2">
                    {moment(expiry).format('M')} / {moment(expiry).format('YY')}
                </p>
                <p className="uppercase absolute bottom-2 left-2">
                    {accountHolderName}
                </p>
            </div>
        </div>
    );
};

export default Card;
