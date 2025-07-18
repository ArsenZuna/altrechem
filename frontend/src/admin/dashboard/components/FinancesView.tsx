import React, { useEffect, useState } from "react";
import { API } from "../../../api/API.tsx";

interface OrderItem {
    qty: number;
    price: number;
}

interface Order {
    _id: string;
    isPaid: boolean;
    paidAt: string; // ISO date
    orderItems: OrderItem[];
    totalPrice: number;
}

interface MonthStats {
    year: number;
    month: number;
    revenue: number;
    itemsSold: number;
}

export const FinancesView: React.FC = () => {
    const [stats, setStats] = useState<MonthStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndCalculate = async () => {
            try {
                const { data: orders } = await API.get<Order[]>("/api/orders");
                const paidOrders = orders.filter((o) => o.isPaid && o.paidAt);

                const start = new Date(2024, 5, 1); // June 2024
                const now = new Date();
                const monthsCount =
                    (now.getFullYear() - start.getFullYear()) * 12 +
                    now.getMonth() -
                    start.getMonth() +
                    1;

                const monthlyStats: MonthStats[] = Array.from(
                    { length: monthsCount },
                    (_, i) => {
                        const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
                        return {
                            year: d.getFullYear(),
                            month: d.getMonth(),
                            revenue: 0,
                            itemsSold: 0,
                        };
                    }
                );

                paidOrders.forEach((order) => {
                    const paidDate = new Date(order.paidAt);
                    const idx =
                        (paidDate.getFullYear() - start.getFullYear()) * 12 +
                        paidDate.getMonth() -
                        start.getMonth();
                    if (idx >= 0 && idx < monthlyStats.length) {
                        monthlyStats[idx].revenue += order.totalPrice;
                        monthlyStats[idx].itemsSold += order.orderItems.reduce(
                            (sum, item) => sum + item.qty,
                            0
                        );
                    }
                });

                setStats(monthlyStats.reverse()); // Most recent first
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Failed to load finances data");
            } finally {
                setLoading(false);
            }
        };

        fetchAndCalculate();
    }, []);

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    if (loading) return <p>Loading finance stats...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold mb-6">Finances</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {stats.map(({ year, month, revenue, itemsSold }) => (
                    <div
                        key={`${year}-${month}`}
                        className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
                    >
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">
                            {monthNames[month]} {year}
                        </h3>
                        <p className="text-green-600 text-md font-medium">
                            Revenue: <span className="font-bold">{revenue.toFixed(2)} ALL</span>
                        </p>
                        <p className="text-gray-800 text-md">
                            Products Sold: <span className="font-bold">{itemsSold}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
