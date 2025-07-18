import React from "react";
import { useNavigate } from 'react-router-dom';
import { HeaderIcons } from './HeaderIcons';

export const NavMobile: React.FC = () => {
    const navigate = useNavigate();

    const items = [
        { label: 'Home',     to: '/' },
        { label: 'About',    to: '/about' },
        { label: 'Shop', to: '/shop' },
        { label: 'Contact',  to: '/contact' },
    ];

    return (
        <div className="bg-white w-full">
            <nav className="flex flex-col divide-y divide-gray-200">
                {items.map(({ label, to }) => (
                    <button
                        key={label}
                        onClick={() => navigate(to)}
                        className="py-4 px-6 text-lg text-gray-800 text-left hover:bg-gray-50 transition"
                    >
                        {label}
                    </button>
                ))}
            </nav>
            <div className="pt-4 pb-6 px-6">
                <HeaderIcons />
            </div>
        </div>
    );
};
