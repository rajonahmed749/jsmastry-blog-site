import React from 'react';
import { useRouter } from 'next/router';

const index = () => {
    const router = useRouter();
    console.log('from test = ', router.pathname);
    return (
        <div>
            <h3>This is for testing</h3>
        </div>
    )
}

export default index
