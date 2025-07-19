import React, { useEffect, useState } from "react";
import { API } from "../../../api/API.tsx";

interface OrderItem {
    product: string;
    name: string;
    image: string;
    qty: number;
}

interface Order {
    createdAt: string;
    orderItems: OrderItem[];
}

interface TopProd {
    productId: string;
    name: string;
    imgUrl: string;
    qtySold: number;
}

export const TopProduct: React.FC = () => {
    const [top, setTop] = useState<TopProd | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data: orders } = await API.get<Order[]>("/api/orders");

                const cutoff = new Date();
                cutoff.setDate(cutoff.getDate() - 30);

                const countMap = new Map<
                    string,
                    { qty: number; name: string; image: string }
                >();

                orders
                    .filter(order => new Date(order.createdAt) >= cutoff)
                    .forEach(order => {
                        order.orderItems.forEach(item => {
                            if (!item.product) return;
                            const entry = countMap.get(item.product);
                            if (entry) {
                                entry.qty += item.qty;
                            } else {
                                countMap.set(item.product, {
                                    qty: item.qty,
                                    name: item.name,
                                    image: item.image,
                                });
                            }
                        });
                    });

                let topProduct: TopProd | null = null;

                for (const [productId, { qty, name, image }] of countMap.entries()) {
                    if (!topProduct || qty > topProduct.qtySold) {
                        topProduct = {
                            productId,
                            name,
                            imgUrl: image,
                            qtySold: qty,
                        };
                    }
                }

                setTop(topProduct);
            } catch (err) {
                console.error("Failed to fetch top product", err);
            }
        })();
    }, []);

    return (
        <div className="bg-white shadow rounded p-6 flex items-center space-x-4">
            <div>
                <h2 className="text-xl font-semibold">Top Product (30 days)</h2>
                {top ? (
                    <>
                        <p className="text-lg font-bold">{top.name}</p>
                        <p>Sold: {top.qtySold} times</p>
                    </>
                ) : (
                    <p>Loading…</p>
                )}
            </div>
            {top?.imgUrl && (
                <img
                    src={`${import.meta.env.VITE_BASE_URL}${top.imgUrl}`}
                    alt={top.name}
                    className="w-24 h-24 object-cover rounded"
                />
            )}
        </div>
    );
};