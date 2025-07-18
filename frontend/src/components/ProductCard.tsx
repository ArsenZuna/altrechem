import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from "../store/CartStore.tsx";
import { Check } from "lucide-react";
import type { Product } from "../utils/types.tsx";

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    const isOutOfStock = product.countInStock === 0;

    const handleAddToCart = (product: Product) => {
        if (isOutOfStock) return;
        useCartStore.getState().addToCart(product);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    const handleProductClick = () => {
        if (isOutOfStock) return;
        navigate(`/products/${product._id}`);
    };

    return (
        <div
            className={`w-60 relative cursor-pointer text-black ${isOutOfStock ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={handleProductClick}
        >
            {showAlert && (
                <div className="absolute top-0 left-0 right-0 p-2 z-10">
                    <div
                        className="flex items-center p-2 text-sm text-green-800 rounded-lg bg-green-50 shadow-lg"
                        role="alert"
                    >
                        <Check size={16} className="mr-2" />
                        <span className="font-medium">Added to cart!</span>
                    </div>
                </div>
            )}

            <div className="relative flex justify-center items-center hover:scale-110 transition-all duration-300">
                <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className={`object-cover ${isOutOfStock ? 'grayscale opacity-70' : 'hover:opacity-90'}`}
                />
                {product.isOnSale && product.salePrice !== undefined && !isOutOfStock && (
                    <span className="absolute top-2 right-2 bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded shadow-md">On Sale</span>
                )}
            </div>

            <div className="grid grid-cols-2 pt-5">
                <div>
                    <p className={`font-semibold ${isOutOfStock ? 'text-gray-500' : 'hover:scale-110 transition-all duration-300 text-shadow-2xs'}`}>
                        {product.name}
                    </p>
                    {product.isOnSale && product.salePrice !== undefined ? (
                        <div className={`font-semibold ${isOutOfStock ? 'text-gray-500' : 'text-green-700'}`}>
                            {product.salePrice} ALL
                        </div>
                    ) : (
                        <p className={`${isOutOfStock ? 'text-gray-500' : 'text-black text-shadow-2xs'}`}>
                            {product.price} ALL
                        </p>
                    )}
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                        }}
                        disabled={isOutOfStock}
                        className={`cursor-pointer font-semibold p-3 transition-all duration-300 ${
                            isOutOfStock
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-blue-300 text-black shadow-md  hover:bg-blue-400 hover:text-white'
                        }`}
                    >
                        {isOutOfStock ? 'Out Of Stock' : 'Add To Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};
