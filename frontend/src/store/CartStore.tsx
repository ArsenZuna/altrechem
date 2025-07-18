import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
    _id: string;
    name: string;
    price: number;
    salePrice?: number;
    isOnSale?: boolean;
    images: { url: string }[];
    quantity?: number;
    countInStock?: number; // ✅ Make sure this is included
}

interface CartStore {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    decrementQuantity: (id: string) => void;
    totalItems: () => number;
    totalPrice: () => number;
}

const THIRTY_MINUTES = 30 * 60 * 1000;

// @ts-ignore
// @ts-ignore
export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product) => {
                const now = Date.now();
                localStorage.setItem("cart_timestamp", now.toString());

                const existing = get().cart.find((p) => p._id === product._id);
                if (existing) {
                    // ✅ Prevent exceeding countInStock
                    if (existing.quantity! >= (product.countInStock ?? Infinity)) return;

                    set({
                        cart: get().cart.map((p) =>
                            p._id === product._id
                                ? { ...p, quantity: (p.quantity || 1) + 1 }
                                : p
                        ),
                    });
                } else {
                    set({ cart: [...get().cart, { ...product, quantity: 1 }] });
                }
            },

            decrementQuantity: (id: string) => {
                set({
                    cart: get().cart
                        .map((item) =>
                            item._id === id && item.quantity! > 1
                                ? { ...item, quantity: item.quantity! - 1 }
                                : item
                        )
                        .filter((item) => item.quantity! > 0),
                });
            },

            removeFromCart: (id) => {
                set({ cart: get().cart.filter((p) => p._id !== id) });
            },

            clearCart: () => {
                localStorage.removeItem("cart_timestamp");
                set({ cart: [] });
            },

            totalItems: () =>
                get().cart.reduce((acc, item) => acc + (item.quantity || 1), 0),

            totalPrice: () =>
                get().cart.reduce((acc, item) => {
                    const price = item.isOnSale && item.salePrice ? item.salePrice : item.price;
                    return acc + price * (item.quantity || 1);
                }, 0),
        }),
        {
            name: "cart-storage",
            merge: (persistedState, currentState) => ({
                ...currentState,
                cart: (persistedState as CartStore).cart || [],
                // Rebind functions after rehydration
                totalItems: currentState.totalItems,
                totalPrice: currentState.totalPrice,
                addToCart: currentState.addToCart,
                removeFromCart: currentState.removeFromCart,
                clearCart: currentState.clearCart,
                decrementQuantity: currentState.decrementQuantity,
            }),
            onRehydrateStorage: () => (state) => {
                const timestamp = localStorage.getItem("cart_timestamp");
                const now = Date.now();

                if (timestamp && now - Number(timestamp) > THIRTY_MINUTES) {
                    localStorage.removeItem("cart-storage");
                    localStorage.removeItem("cart_timestamp");
                    state?.clearCart();
                }
            },
        }
    )
);