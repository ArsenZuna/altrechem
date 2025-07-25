// components/CartSummary.tsx
import { Trash2 } from 'lucide-react';

export const CartSummary = ({ cartItems, totalPrice, addToCart, decrementQuantity, removeFromCart, t }: any) => (
    <div>
        <h2 className="text-xl font-semibold mb-4">{t("order.0.cart.0.header")}</h2>
        <div className='space-y-4'>
            {cartItems.map((item: any) => (
                <div key={item._id} className='flex space-x-4'>
                    <img src={
                        item.images[0]?.url
                            ? `${import.meta.env.VITE_BASE_URL}${item.images[0]?.url}`
                            : "/fallback.jpg"
                    } alt={item.name} className='w-16 h-16 rounded' />
                    <div className='w-full'>
                        <div className='flex justify-between font-medium'>
                            <p>{item.name}</p>
                            <p>{(item.isOnSale && item.salePrice ? item.salePrice : item.price)} ALL</p>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                            <button onClick={() => decrementQuantity(item._id)} className="px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded">−</button>
                            <span className="font-semibold">{item.quantity}</span>
                            <button
                                onClick={() => {
                                    if (item.quantity < item.countInStock) {
                                        addToCart(item);
                                    } else {
                                        alert(`Only ${item.countInStock} in stock`);
                                    }
                                }}
                                className="px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                +
                            </button>
                            <button onClick={() => removeFromCart(item._id)} className="ml-auto p-1 text-red-500 hover:text-red-700">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="pt-4 border-t mt-4">
                <p className="flex justify-between font-semibold">
                    <span>Subtotal:</span><span>{totalPrice()} ALL</span>
                </p>
                <p className="flex justify-between text-sm text-gray-600">
                    <span>{t("order.0.cart.1.shipping")}:</span><span>{totalPrice() > 5000 ? "Free" : "300 ALL"}</span>
                </p>
                <p className="flex justify-between font-bold text-lg mt-2">
                    <span>Total:</span><span>{totalPrice() + (totalPrice() > 5000 ? 0 : 300)} ALL</span>
                </p>
            </div>
        </div>
    </div>
);
