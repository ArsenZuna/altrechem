import {useAuthStore} from '../utils/AuthStore';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {API} from '../api/API';
import {useTranslation} from "react-i18next";

interface OrderItem {
    _id: string;
    createdAt: string;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
}

export const ClientProfile = () => {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (user.role === 'admin') {
            navigate('/dashboard');
            return;
        }

        const fetchOrders = async () => {
            try {
                const {data} = await API.get('/api/orders/myorders', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setOrders(data);
            } catch (err) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setError(err.response?.data?.message || 'Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const goToHome = () => {
        navigate('/');
    }

    if (!user || user.role === 'admin') return null;

    return (
        <div className="max-w-4xl mx-auto mt-32 p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{t("profile.0.header")}</h2>

            <div className="space-y-4 mb-10">
                <div>
                    <h4 className="text-sm text-gray-500">{t("profile.0.name")}</h4>
                    <p className="text-lg font-semibold">{user.name} {user.lastname}</p>
                </div>

                <div>
                    <h4 className="text-sm text-gray-500">{t("profile.0.email")}</h4>
                    <p className="text-lg font-semibold">{user.email}</p>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">{t("profile.1.table.0.header")}</h3>
                {loading ? (
                    <p>Loading orders...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-600">{t("profile.1.table.0.no_orders")}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border border-gray-200">
                            <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-4 py-2">{t("profile.1.table.0.id")}</th>
                                <th className="px-4 py-2">{t("profile.1.table.0.date")}</th>
                                <th className="px-4 py-2">{t("profile.1.table.0.total")}</th>
                                <th className="px-4 py-2">{t("profile.1.table.0.paid")}</th>
                                <th className="px-4 py-2">{t("profile.1.table.0.delivered")}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-t">
                                    <td className="px-4 py-2">{order._id.slice(-6)}</td>
                                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{order.totalPrice} ALL</td>
                                    <td className="px-4 py-2">{order.isPaid ? 'Yes' : 'No'}</td>
                                    <td className="px-4 py-2">{order.isDelivered ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className='flex justify-between items-center'>
                <div className="mt-10 text-center">
                    <button
                        onClick={goToHome}
                        className="px-6 py-2 bg-pink-300 text-white rounded hover:bg-pink-400 transition"
                    >
                        {t("profile.2.buttons.0.return")}
                    </button>
                </div>
                <div className="mt-10 text-center">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        {t("profile.2.buttons.1.logout")}
                    </button>
                </div>
            </div>
        </div>
    );
};
