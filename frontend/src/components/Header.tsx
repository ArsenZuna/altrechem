// src/components/Header.tsx
import React, {useState} from 'react';
import Logo from '../../public/Altrechem.png';
import {Nav} from './Nav';
import {Menu, ShoppingCart, X} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {HeaderIcons} from './HeaderIcons';
import {NavMobile} from './NavMobile';
import {useCartStore} from "../store/CartStore.tsx";
import {useAuthStore} from "../utils/AuthStore.tsx";

export const Header: React.FC = () => {
    const cartItems = useCartStore((s) => s.cart);
    const user = useAuthStore((s) => s.user);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const goToHome = () => {
        navigate('/');
    }

    const handleMobileCartClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/cart/checkout');
        }
    };

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
                    <Nav/>
                </div>
                <div className="hidden md:flex">
                    <HeaderIcons/>
                </div>
                <div className="md:hidden flex items-center gap-1">
                    <div className="relative cursor-pointer" onClick={handleMobileCartClick}>
                        <ShoppingCart className="hover:text-red-600 hover:scale-110 transition-all duration-300"/>
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartItems.length}
                            </span>
                        )}
                    </div>
                    <button className="p-4" onClick={() => setOpen((o) => !o)}>
                        {open ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>
            </div>
            {open && (
                <div className="md:hidden shadow-md">
                    <NavMobile/>
                </div>
            )}
        </header>
    );
};
