import React, { useState, useEffect } from "react";
import { type Product } from "../../../utils/types.tsx";
import { API } from "../../../api/API.tsx";

interface EditProductModalProps {
    product: Product;
    onClose: () => void;
    onSave: (updated: Product) => void;
    onDelete: (id: string) => void;
}

export const EditProductModal = ({
                                     product,
                                     onClose,
                                     onSave,
                                     onDelete,
                                 }: EditProductModalProps) => {
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState<Product>(product);

    useEffect(() => {
        setFormState(product);
    }, [product]);

    const handleChange = (field: keyof Product, value: any) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.put(`/api/products/${product._id}`, {
                price: formState.price,
                salePrice: formState.salePrice,
                isOnSale: formState.isOnSale,
                countInStock: formState.countInStock,
                featured: formState.featured, // ✅ Include in update
            });

            onSave(formState);
            onClose();
        } catch (err) {
            console.error("Failed to update product:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await API.delete(`/api/products/${product._id}`);
            onDelete(product._id);
            onClose();
        } catch (err) {
            console.error("Failed to delete product:", err);
            alert("Failed to delete product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-2 sm:px-4">
            <div className="bg-white w-full max-w-lg rounded-lg p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-5 text-gray-500 text-2xl hover:text-red-600"
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Price */}
                    <div>
                        <label className="block font-medium">Price (ALL)</label>
                        <input
                            type="number"
                            value={formState.price}
                            onChange={(e) => handleChange("price", Number(e.target.value))}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Sale toggle and price */}
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formState.isOnSale}
                                onChange={(e) => handleChange("isOnSale", e.target.checked)}
                                className="mr-2"
                            />
                            On Sale?
                        </label>
                        {formState.isOnSale && (
                            <input
                                type="number"
                                value={formState.salePrice || 0}
                                onChange={(e) => handleChange("salePrice", Number(e.target.value))}
                                className="w-full border rounded p-2"
                                placeholder="Sale Price"
                            />
                        )}
                    </div>

                    {/* Featured checkbox */}
                    <div>
                        <label className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                checked={formState.featured}
                                onChange={(e) => handleChange("featured", e.target.checked)}
                                className="mr-2"
                            />
                            Featured Product?
                        </label>
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block font-medium">Count In Stock</label>
                        <input
                            type="number"
                            value={formState.countInStock}
                            onChange={(e) =>
                                handleChange("countInStock", Number(e.target.value))
                            }
                            className="w-full border rounded p-2"
                        />
                    </div>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mb-2"
                    >
                        {loading ? "Deleting..." : "Delete Product"}
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};