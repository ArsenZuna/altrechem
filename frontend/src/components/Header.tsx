// src/components/Header.tsx
import React, { useState } from 'react';
import Logo from '../../public/Altrechem.png';
import { Nav } from './Nav';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HeaderIcons } from './HeaderIcons';
import { NavMobile } from './NavMobile';

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const goToHome = () => {
        navigate('/');
    }

    return (
        <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-24 px-4 md:px-8">
                <img
                    src={Logo}
                    alt="Altrechem"
                    className="h-20 w-20 cursor-pointer"
                    onClick={goToHome}
                />
                <div className="hidden md:flex items-center space-x-6">
                    <Nav />
                </div>
                <div className="hidden md:flex">
                    <HeaderIcons />
                </div>
                <button
                    className="md:hidden p-4"
                    onClick={() => setOpen((o) => !o)}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {open && (
                <div className="md:hidden shadow-md">
                    <NavMobile />
                </div>
            )}
        </header>
    );
};
