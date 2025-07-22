import React, {type ReactNode, useState } from 'react';
import { Sidebar } from '../dashboard/components/Sidebar.tsx';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    return (
        <div className="bg-gray-100 min-h-screen overflow-x-hidden">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed top-5 right-5 z-50 p-2 bg-white rounded-lg shadow-md"
            >
                ☰
            </button>

            <div className="flex lg:justify-center">
                <div className="p-3">
                    <Sidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                </div>

                <div className="mx-10 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
