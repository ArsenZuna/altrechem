import React, { useEffect, useState } from "react";
import { API } from "../../../api/API.tsx";
import type { Product } from "../../../utils/types.tsx";

export const FeaturedProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            const { data } = await API.get<Product[]>("/api/products");
            setProducts(data);
        })();
    }, []);

    const featuredProducts = products.filter(p => p.featured);

    return (
        <div className="bg-white shadow rounded p-6">
            <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
            <div className="flex-col">
                {products.length === 0 ? <p>No featured products</p> : featuredProducts.map(product => (
                    <div className='flex py-2 justify-between items-center'>
                        <img src={product.images[0].url} alt={product.name} className='w-20 h-20'/>
                        <p className='text-xl font-semibold'>{product.name}</p>
                        <p className='text-xl font-semibold text-green-500'>{product.price.toFixed(2)} ALL</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
