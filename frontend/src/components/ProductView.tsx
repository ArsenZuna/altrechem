import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api/API";
import { useCartStore } from "../store/CartStore.tsx";

interface Product {
    _id: string;
    name: string;
    price: number;
    salePrice?: number;
    isOnSale?: boolean;
    description?: string;
    category?: string;
    images: { url: string }[];
}

export const ProductView = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!productId) return;

        API.get<Product>(`/api/products/${productId}`)
            .then((res) => {
                setProduct(res.data);
                setMainImage(res.data.images[0]?.url || null);
            })
            .catch((err) => setError(err.message || "Failed to fetch product"))
            .finally(() => setLoading(false));
    }, [productId]);

    const effectivePrice = product?.isOnSale && product.salePrice
        ? product.salePrice
        : product?.price;

    const handleAddToCart = (product: Product) => {
        useCartStore.getState().addToCart(product);
    };

    if (loading) return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className="w-32 h-32 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin" />
        </div>
    );
    if (error) return <p className="text-center text-red-600">{error}</p>;
    if (!product) return <p className="text-center">Product not found.</p>;

    return (
        <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex lg:flex-col gap-2">
                    {product.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={`${import.meta.env.VITE_BASE_URL}${img.url}`}
                            alt={`Thumbnail ${idx}`}
                            onClick={() => setMainImage(`${import.meta.env.VITE_BASE_URL}${img.url}`)}
                            className={`w-20 h-20 object-cover border rounded cursor-pointer 
    ${mainImage === `${import.meta.env.VITE_BASE_URL}${img.url}` ? "border-green-600 ring-2 ring-green-400" : "border-gray-300"}`}
                        />
                    ))}
                </div>

                {/* Main Image */}
                <div>
                    <img
                        src={mainImage || `${import.meta.env.VITE_BASE_URL}${product.images[0]?.url}`}
                        alt={product.name}
                        className="xl:w-[650px] xl:h-[600px] object-cover rounded shadow-2xl"
                    />
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 pt-12">
                <h1 className="text-4xl font-bold text-shadow-xs">{product.name}</h1>
                <p className="text-gray-600 first-letter:uppercase text-shadow-xs">{product.category}</p>

                <div className="text-xl font-semibold text-green-700">
                    {effectivePrice} ALL
                    {product.isOnSale && product.salePrice && (
                        <span className="ml-3 text-red-600 line-through text-sm text-shadow-xs">
                            {product.price} ALL
                        </span>
                    )}
                </div>

                <p className="text-gray-700 text-shadow-2xs">{product.description || "No description available."}</p>

                {product.isOnSale && (
                    <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">
                        On Sale
                    </span>
                )}

                <div className="flex justify-start">
                    <button
                        onClick={() => handleAddToCart(product)}
                        className="cursor-pointer bg-blue-300 text-black font-semibold p-3 shadow-md hover:bg-blue-400 hover:text-white transition-all duration-300"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
