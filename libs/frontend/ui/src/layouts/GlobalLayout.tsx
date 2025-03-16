'use client';
import React from 'react';
import Header from '../components/Header/Header';

interface Props {
    children: React.ReactNode;
}

function GlobalLayout({ children }: Props) {
    return (
        <>
            <Header />
            <div className="flex h-screen">{children}</div>
        </>
    );
}

export default GlobalLayout;
