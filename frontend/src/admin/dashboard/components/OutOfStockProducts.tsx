import React, { useEffect, useState } from "react";
import { API } from "../../../api/API.tsx";
import type { Product } from "../../../utils/types.tsx";

export const OutOfStockProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await API.get<Product[]>("/api/products");
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const outOfStock = products.filter(p => !p.countInStock || p.countInStock === 0);

    return (
        <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Out-of-Stock Products</h2>

            {loading && <p>Loading…</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && outOfStock.length === 0 && (
                <p>All products are in stock!</p>
            )}

            {!loading && !error && outOfStock.length > 0 && (
                <ul className="space-y-2">
                    {outOfStock.map(p => (
                        <li key={p._id} className="text-xl font-semibold text-red-600">
                            {p.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
