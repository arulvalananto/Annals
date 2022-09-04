import React from 'react';
import QRCode from 'qrcode.react';
import { ContentPaste, Delete } from '@mui/icons-material';

import { walletRows } from '../../../utils/constants';
import IconButton from '../../../components/IconButton';

const Wallet = ({ cryptoWallet, handleDeleteMode }) => {
    const { publicAddress, _id } = cryptoWallet;

    return (
        <div className="flex flex-col w-72 bg-mildgray rounded p-4 relative">
            <div className="absolute top-4 right-4 flex gap-2">
                <div onClick={() => handleDeleteMode(_id)}>
                    <IconButton Icon={Delete} color="danger" />
                </div>
            </div>
            {publicAddress && (
                <>
                    <label className="text-xs mb-1 text-gray-600">
                        Public Address
                    </label>
                    <QRCode value={publicAddress} size={64} level="M" />
                </>
            )}
            {walletRows.map(({ title, select }, index) => {
                return (
                    cryptoWallet[select] && (
                        <div key={index}>
                            <label className="text-xs mb-1 text-gray-600 capitalize ">
                                {title}
                            </label>
                            <div className="group flex items-center gap-2">
                                <input
                                    type="password"
                                    disabled
                                    value={cryptoWallet[select]}
                                    className="bg-mildgray"
                                />
                                <button type="button">
                                    <IconButton Icon={ContentPaste} />
                                </button>
                            </div>
                        </div>
                    )
                );
            })}
        </div>
    );
};

export default Wallet;
