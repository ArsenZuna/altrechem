import { useEffect, useState } from "react";
import { API } from "../../../api/API";
import type { Order } from "../../../utils/types.tsx";
import { EditOrderModal } from "../extras/EditOrdersModal.tsx";

export const OrdersTable = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get("/api/orders");
                setOrders(data.reverse());
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-32 h-32 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin" />
        </div>
    );

    return (
        <>
            <div className="overflow-x-auto mt-8">
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered</th>
                        <th className="lg:hidden px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map(order => (
                        <tr
                            key={order._id}
                            className="hover:bg-gray-200/70 cursor-pointer"
                            onClick={() => setSelectedOrder(order)}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                {order._id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {order.user?.name || order.guestInfo?.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {order.totalPrice} ALL
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <span className={order.isPaid ? "text-green-600 font-semibold" : "text-red-500"}>
                                        {order.isPaid ? "Yes" : "No"}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <span className={order.isDelivered ? "text-green-600 font-semibold" : "text-red-500"}>
                                        {order.isDelivered ? "Yes" : "No"}
                                    </span>
                            </td>
                            <td className="lg:hidden px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent row click
                                        setSelectedOrder(order);
                                    }}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedOrder && (
                <EditOrderModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdate={(updated) =>
                        setOrders(prev =>
                            prev.map(o => (o._id === updated._id ? updated : o))
                        )
                    }
                />
            )}
        </>
    );
};