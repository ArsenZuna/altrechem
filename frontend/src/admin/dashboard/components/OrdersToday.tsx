import React, { useEffect, useState } from "react";
import { API } from "../../../api/API.tsx";

export const OrdersToday: React.FC = () => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data: orders } = await API.get("/api/orders");

                const today = new Date();
                const todayDate = today.toISOString().split('T')[0];

                const todaysOrders = orders.filter((order: any) => {
                    const createdDate = new Date(order.createdAt).toISOString().split('T')[0];
                    return createdDate === todayDate;
                });

                setCount(todaysOrders.length);
            } catch (err) {
                console.error("Failed to fetch orders", err);
                setCount(0);
            }
        })();
    }, []);

    return (
        <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-2">Orders Made Today</h2>
            {count === null ? <p>Loading…</p> : <p className="text-3xl">{count}</p>}
        </div>
    );
};
