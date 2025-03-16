'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface GlobalContextProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
}

interface Props {
    children: React.ReactNode;
}

function GlobalProvider({ children }: Props) {
    const [isPageReady, setIsPageReady] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        setIsPageReady(true);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    if (!isPageReady) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <span className="loading loading-dots loading-xl"></span>
            </div>
        );
    }

    return (
        <GlobalContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;
