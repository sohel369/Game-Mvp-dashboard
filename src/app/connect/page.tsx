'use client';

import dynamic from 'next/dynamic';

const ConnectContent = dynamic(() => import('./ConnectContent'), { ssr: false });

export default function ConnectPage() {
    return <ConnectContent />;
}
