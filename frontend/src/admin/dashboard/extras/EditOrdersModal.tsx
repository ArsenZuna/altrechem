import React, { useState, useEffect } from "react";
import type { Order, OrderItem } from "../../../utils/types";
import { API } from "../../../api/API";
import { useNavigate } from "react-router-dom";

interface Props {
    order: Order;
    onClose: () => void;
    onUpdate: (updated: Order | null) => void;
}

export const EditOrderModal: React.FC<Props> = ({ order, onClose, onUpdate }) => {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [isPaid, setIsPaid] = useState(order.isPaid);
    const [isDelivered, setIsDelivered] = useState(order.isDelivered);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const [totals, setTotals] = useState({
        itemsPrice: 0,
        shippingPrice: 0,
        totalPrice: 0,
    });

    // Fetch latest stock for each product
    useEffect(() => {
        const fetchStockInfo = async () => {
            try {
                const res = await API.get("/api/products");
                const allProducts = res.data;

                const itemsWithStock = order.orderItems.map(item => {
                    const product = allProducts.find((p: { _id: string; }) => p._id === item.product);
                    return {
                        ...item,
                        countInStock: product?.countInStock || 0,
                    };
                });

                setOrderItems(itemsWithStock);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                console.error("Failed to fetch product stock info");
                setError("Error loading product stock information.");
            }
        };

        fetchStockInfo();
    }, [order.orderItems]);

    // Recalculate totals
    useEffect(() => {
        const itemsPrice = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
        const shippingPrice = itemsPrice > 5000 ? 0 : 300;
        const totalPrice = +(itemsPrice + shippingPrice).toFixed(2);

        setTotals({ itemsPrice, shippingPrice, totalPrice });
    }, [orderItems]);

    const handleQtyChange = (index: number, newQty: number) => {
        const updated = [...orderItems];
        updated[index].qty = Math.min(newQty, updated[index].countInStock || newQty);
        setOrderItems(updated);
    };

    const handleRemoveItem = (index: number) => {
        const updated = [...orderItems];
        updated.splice(index, 1);
        setOrderItems(updated);
    };

    const handleSave = async () => {
        setLoading(true);

        const overstocked = orderItems.find(item => item.qty > (item.countInStock || 0));
        if (overstocked) {
            setError(`Not enough stock for "${overstocked.name}".`);
            setLoading(false);
            return;
        }

        try {
            const updatedOrder = {
                orderItems,
                isPaid,
                isDelivered,
                itemsPrice: totals.itemsPrice,
                shippingPrice: totals.shippingPrice,
                totalPrice: totals.totalPrice,
            };

            const { data } = await API.put(`/api/orders/${order._id}`, updatedOrder);
            onUpdate(data);
            onClose();
            navigate("/dashboard/orders");
        } catch (err) {
            console.error(err);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err.response?.data?.message || "Failed to update order");
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async () => {
        const confirm = window.confirm("Are you sure you want to delete this order?");
        if (!confirm) return;

        setLoading(true);
        try {
            await API.delete(`/api/orders/${order._id}`);
            onUpdate(null);
            onClose();
        } catch (err) {
            console.error(err);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err.response?.data?.message || "Failed to delete order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-xl relative overflow-y-auto max-h-[90vh]">
                <button onClick={onClose} className="absolute top-3 right-4 text-gray-600 hover:text-red-600 text-2xl">
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4">Edit Order</h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}

                {orderItems.map((item, idx) => (
                    <div key={item.product} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.price} ALL</p>
                            <p className="text-xs text-gray-400">Stock left: {item.countInStock}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            <input
                                type="number"
                                min={1}
                                max={item.countInStock}
                                value={item.qty}
                                onChange={e => {
                                    const qty = parseInt(e.target.value);
                                    if (!isNaN(qty)) handleQtyChange(idx, qty);
                                }}
                                className="w-16 border rounded px-2 py-1"
                            />
                            <button
                                onClick={() => handleRemoveItem(idx)}
                                className="text-red-600 hover:underline text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                <hr className="my-4" />

                <div className="mb-2">Items Price: <strong>{totals.itemsPrice} ALL</strong></div>
                <div className="mb-2">Shipping: <strong>{totals.shippingPrice} ALL</strong></div>
                <div className="mb-4">Total: <strong>{totals.totalPrice} ALL</strong></div>

                <div className="mb-4">
                    <label className="inline-flex items-center mr-4">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={isPaid}
                            onChange={e => setIsPaid(e.target.checked)}
                        />
                        Mark as Paid
                    </label>

                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={isDelivered}
                            onChange={e => setIsDelivered(e.target.checked)}
                        />
                        Mark as Delivered
                    </label>
                </div>

                <div className="my-4">
                    <h2 className="font-semibold text-xl">Delivery Address</h2>
                    <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                </div>

                <button
                    onClick={deleteOrder}
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mb-2"
                >
                    {loading ? "Deleting..." : "Delete Order"}
                </button>
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
};
