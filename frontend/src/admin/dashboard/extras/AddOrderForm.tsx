import { useEffect, useState } from 'react';
import { API } from "../../../api/API.tsx";
import type {OrderItem, Product} from "../../../utils/types.tsx";

// @ts-ignore
export const AddOrderForm = ({ onSuccess }) => {
    const [products, setProducts] = useState([]);
    const [guestInfo, setGuestInfo] = useState({ name: '', phone: '' });
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [shippingPrice, setShippingPrice] = useState(0);

    // @ts-ignore
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const totalPrice = itemsPrice + Number(shippingPrice);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await API.get('/api/products');
            setProducts(res.data);
        };
        fetchProducts();
    }, []);

    const handleAddItem = () => {
        // @ts-ignore
        setOrderItems([...orderItems, { product: '', qty: 1, price: 0 }]);
    };

    const handleItemChange = (
        index: number,
        field: keyof OrderItem,
        value: string | number
    ) => {
        const updatedItems = [...orderItems];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value,
        };
        setOrderItems(updatedItems);
    };


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const orderData = {
            guestInfo,
            orderItems,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            itemsPrice,
            totalPrice
        };

        try {
            await API.post('/api/orders', orderData);
            alert('Order created successfully!');
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onSuccess && onSuccess();
        } catch (error) {
            // @ts-ignore
            alert.error(error?.response?.data?.message || 'Error creating order');
        }
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Guest Order</h2>

            {/* Guest Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold">Guest Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2"
                        value={guestInfo.name}
                        onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Guest Phone</label>
                    <input
                        type="phone"
                        className="w-full border border-gray-300 rounded p-2"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                        required
                    />
                </div>
            </div>

            {/* Shipping Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['address', 'city', 'postalCode', 'country'].map((field) => (
                    <input
                        key={field}
                        type="text"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="w-full border border-gray-300 rounded p-2"
                        value={(shippingAddress as any)[field]}
                        onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, [field]: e.target.value })
                        }
                        required
                    />
                ))}
            </div>

            {/* Payment & Shipping Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold">Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                    >
                        <option value="PayPal">PayPal</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>
                <div>
                    <label className="block font-semibold">Shipping Price (€)</label>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded p-2"
                        value={shippingPrice}
                        onChange={(e) => setShippingPrice(Number(e.target.value))}
                        required
                    />
                </div>
            </div>

            {/* Order Items */}
            <div>
                <label className="block font-bold mb-2">Order Items</label>
                <div className="space-y-3">
                    {orderItems.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                            <select
                                value={item.product}
                                onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                                className="border border-gray-300 rounded p-2"
                                required
                            >
                                <option value="">-- Select Product --</option>
                                {products.map((p: Product) =>
                                    p.countInStock && p.countInStock > 0 ? (
                                        <option key={p._id} value={p._id}>
                                            {p.name} ({p.countInStock} in stock)
                                        </option>
                                    ) : null
                                )}
                            </select>

                            <input
                                type="number"
                                value={item.qty}
                                onChange={(e) => handleItemChange(index, 'qty', Number(e.target.value))}
                                className="border border-gray-300 rounded p-2"
                                min={1}
                                max={item.countInStock ?? undefined}
                                required
                            />

                            <input
                                type="number"
                                value={item.price}
                                className="border border-gray-200 bg-gray-100 rounded p-2"
                                disabled
                            />

                            <div className="font-medium text-right text-sm sm:text-base">
                                {item.qty * item.price} ALL
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={handleAddItem}
                    className="mt-2 px-4 py-2 text-sm rounded bg-blue-100 hover:bg-blue-200 text-blue-800"
                >
                    + Add Item
                </button>
            </div>
            <div className="text-right space-y-2 text-sm sm:text-base">
                <p>Items Price: <strong>{itemsPrice} ALL</strong></p>
                <p>Total Price: <strong>{totalPrice} ALL</strong></p>
            </div>

            <button
                type="submit"
                className="w-full py-3 px-6 rounded bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
                Create Order
            </button>
        </form>
    );
};

export default AddOrderForm;
