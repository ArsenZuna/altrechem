import { useEffect, useState } from "react";
import { API } from "../../../api/API.tsx";
import type {Product} from "../../../utils/types.tsx";
import {EditProductModal} from "../extras/EditProductModal.tsx";

export const ProductsTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await API.get<Product[]>("/api/products");
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleProductSave = (updated: Product | null) => {
        if (!updated || !updated._id) return;
        setProducts(prev => prev.map(p => (p._id === updated._id ? updated : p)));
    };

    const handleProductDelete = (id: string) => {
        setProducts(prev => prev.filter(p => p._id !== id));
    };


    if (loading) return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className="w-32 h-32 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"/>
        </div>
    );

    return (
        <div className="overflow-x-auto mt-8">
            <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {products.map(product => (
                    <tr key={product._id} className='hover:bg-gray-200/70 cursor-pointer' onClick={() => setEditingProduct(product)}>
                        <td className="px-6 py-4 whitespace-nowrap ">
                            <img
                                src={product.images?.[0]?.url || "/placeholder.jpg"}
                                alt={product.name}
                                className="w-14 h-14 object-cover rounded"
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800">
                            {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                            {product.isOnSale && product.salePrice ? (
                                <div>
                                    <span className="line-through text-red-400 mr-1">{product.price} ALL</span>
                                    <span className="text-green-600 font-semibold">{product.salePrice} ALL</span>
                                </div>
                            ) : (
                                `${product.price} ALL`
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                            {product.isOnSale ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                            {product.featured ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                            {product.countInStock}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {editingProduct && editingProduct._id && (
                <EditProductModal
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={handleProductSave}
                    onDelete={handleProductDelete}
                />

            )}
        </div>
    );
};
