import React from 'react';
import { Skeleton } from '@mui/material';

const SkeletonLoader = () => {
    return (
        <div className="grid lg:grid-cols-4 xl:place-items-center md:grid-cols-3 sm:grid-cols-2 lg:gap-x-1 gap-x-3 gap-y-5 grid-cols-1 p-3 py-10 pb-40 sm:pb-10">
            {Array(4)
                .fill(0)
                .map((val) => (
                    <Skeleton
                        animation="wave"
                        sx={{ bgcolor: 'grey.900' }}
                        variant="rectangular"
                        width={288}
                        height={160}
                        className="mr-2 rounded"
                    />
                ))}
        </div>
    );
};

export default React.memo(SkeletonLoader);
