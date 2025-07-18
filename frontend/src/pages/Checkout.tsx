import React, {useState} from 'react';
import {useCartStore} from "../store/CartStore";
import {useAuthStore} from "../utils/AuthStore";
import {useNavigate} from "react-router-dom";
import {API} from "../api/API";
import {OrderForm} from "../components/extras/OrderForm.tsx";
import {CartSummary} from "../components/CartSummary.tsx";

export const Checkout = () => {
    const {user} = useAuthStore();
    const cartItems = useCartStore((s) => s.cart);
    const clearCart = useCartStore((s) => s.clearCart);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const totalPrice = useCartStore((s) => s.totalPrice);
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return setError('User not logged in');
        if (cartItems.length === 0) return setError('Cart is empty');

        const itemsPrice = totalPrice();
        const shippingPrice = itemsPrice > 5000 ? 0 : 300; // example rule
        const finalTotal = itemsPrice + shippingPrice;

        const orderItems = cartItems.map(item => ({
            product: item._id,
            name: item.name,
            qty: item.quantity || 1,
            price: item.isOnSale && item.salePrice ? item.salePrice : item.price,
            image: item.images[0]?.url || ''
        }));

        try {
            setLoading(true);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const {data} = await API.post('/api/orders', {
                orderItems,
                shippingAddress: {address, city, postalCode, country},
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice: finalTotal
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            clearCart();
            navigate(`/profile`);
        } catch (err) {
            console.error(err);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    const goToShop = () => {
        navigate(`/shop`);
    }

    return (
        <div className='flex justify-center m-5 pl-6 md:pl-0 lg:pt-44'>
            {cartItems.length === 0 ? (
                <div className='flex flex-col justify-center items-center gap-5'>
                    <p className='text-xl font-semibold'>Your cart is empty...</p>
                    <button className='cursor-pointer text-2xl font-semibold bg-pink-300 hover:bg-pink-400 text-white p-5' onClick={goToShop}>Start Shopping</button>
                </div>
            ) : (
                <div className='container w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-5'>
                    <div className='col-span-3 md:border-b-0 md:border-r-4 pr-8'>
                        <OrderForm
                            address={address} setAddress={setAddress}
                            city={city} setCity={setCity}
                            postalCode={postalCode} setPostalCode={setPostalCode}
                            country={country} setCountry={setCountry}
                            paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
                            handleSubmit={handleOrderSubmit}
                            error={error} loading={loading}
                        />
                    </div>
                    <div className='col-span-1'>
                        <CartSummary
                            cartItems={cartItems}
                            totalPrice={totalPrice}
                            addToCart={useCartStore.getState().addToCart}
                            decrementQuantity={useCartStore.getState().decrementQuantity}
                            removeFromCart={removeFromCart}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
