'use client';

import React from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

interface Props {
    children: React.ReactNode;
}

function GlobalLayout({ children }: Props) {
    return (
        <>
            <Header />
            <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
        </>
    );
}

export default GlobalLayout;
