import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../utils/AuthStore.tsx";
import { useCartStore } from "../store/CartStore.tsx";
import { ShoppingCart, User } from "lucide-react";
import {CartSidebar} from "./extras/CartSidebar.tsx";

export const HeaderIcons = () => {
    const cartItems = useCartStore((s) => s.cart);
    const navigate = useNavigate();
    const user = useAuthStore((s) => s.user);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleUserClick = () => {
        if (!user) {
            return navigate('/login');
        }
        if (user.role === 'admin') {
            navigate('/dashboard');
        } else {
            navigate('/profile');
        }
    };

    const cartSidebarToggle = () => {
        if (!user) {
            navigate('/login');
        } else {
            setSidebarOpen(true);
        }
    };

    const handleMobileCartClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/cart/checkout');
        }
    };

    return (
        <div className="flex items-center space-x-4 mr-12 relative">
            {/* Mobile Cart Icon */}
            <div className="relative md:hidden cursor-pointer" onClick={handleMobileCartClick}>
                <ShoppingCart className="hover:text-red-600 hover:scale-110 transition-all duration-300" />
                {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItems.length}
                    </span>
                )}
            </div>

            {/* Desktop Cart Icon */}
            <div className="hidden md:block relative cursor-pointer" onClick={cartSidebarToggle}>
                <ShoppingCart className="hover:text-red-600 hover:scale-110 transition-all duration-300" />
                {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItems.length}
                    </span>
                )}
            </div>

            {/* Profile/User Icon */}
            <User
                className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all duration-300"
                onClick={handleUserClick}
            />

            {/* Sidebar */}
            {sidebarOpen && <CartSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
        </div>
    );
};
