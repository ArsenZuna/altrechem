import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/CartStore";
import { X, Minus, Plus, Trash2 } from "lucide-react";

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
    const cartItems = useCartStore((s) => s.cart);
    const addToCart = useCartStore((s) => s.addToCart);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const decrementQuantity = useCartStore((s) => s.decrementQuantity);
    const total = useCartStore((s) => s.totalPrice());
    const navigate = useNavigate();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed right-0 top-0 w-80 h-screen border-l border-gray-200 bg-white transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } md:translate-x-0 z-50 shadow-xl p-4 overflow-y-auto`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    <X className="cursor-pointer" onClick={onClose} />
                </div>

                {cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item) => {
                            const itemTotal = (item.isOnSale && item.salePrice ? item.salePrice : item.price) * (item.quantity || 1);
                            return (
                                <div key={item._id} className="flex items-center space-x-3 pb-2">
                                    <img
                                        src={
                                            item.images[0]?.url
                                                ? `${import.meta.env.VITE_BASE_URL}${item.images[0]?.url}`
                                                : "/fallback.jpg"
                                        }
                                        alt={item.name}
                                        className="w-18 h-18 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-md font-semibold">{item.name}</h4>
                                        <p className="text-xs text-gray-500 text-shadow-2xs">
                                            {(item.isOnSale && item.salePrice ? item.salePrice : item.price)} ALL each
                                        </p>
                                        <p className="text-xs text-gray-500 text-shadow-2xs">Subtotal: {itemTotal} ALL</p>
                                        <div className="flex items-center mt-1 space-x-2">
                                            <button
                                                onClick={() => decrementQuantity(item._id)}
                                                className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer transition-all"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="text-md text-shadow-xs">{item.quantity || 1}</span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="p-1.5 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer transition-all"
                                            >
                                                <Plus size={12} />
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="ml-auto p-1 text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {cartItems.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                        <p className="text-md font-semibold text-shadow-xs">Total: {total} ALL</p>
                        <button
                            onClick={() => {
                                onClose();
                                navigate("/cart/checkout");
                            }}
                            className="w-full mt-2 bg-blue-300 text-black py-2 text-md font-semibold hover:bg-blue-400 transition-all"
                        >
                            Go to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};
