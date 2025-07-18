import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { API } from "../../../api/API.tsx";
import { useNavigate } from 'react-router-dom';

const categories = ['skincare', 'makeup', 'hair', 'fragrance', 'body'];

export const AddProductForm: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [featured, setFeatured] = useState(false);
    const [price, setPrice] = useState<number>(0);
    const [countInStock, setCountInStock] = useState<number>(0);
    const [isOnSale, setIsOnSale] = useState(false);
    const [salePrice, setSalePrice] = useState<number>(0);
    const [ingredients, setIngredients] = useState<string>('');
    const [sizes, setSizes] = useState<string>('');
    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urls = images.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);

        return () => {
            urls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [images]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setImages(prev => [...prev, ...Array.from(e.target.files)]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const moveImage = (index: number, direction: 'left' | 'right') => {
        setImages(prev => {
            const newArr = [...prev];
            const targetIndex = direction === 'left' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex >= newArr.length) return prev;
            [newArr[index], newArr[targetIndex]] = [newArr[targetIndex], newArr[index]];
            return newArr;
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const form = new FormData();
            form.append('name', name);
            form.append('description', description);
            form.append('category', category);
            form.append('featured', String(featured));
            form.append('price', String(price));
            form.append('countInStock', String(countInStock));
            form.append('isOnSale', String(isOnSale));
            if (isOnSale) form.append('salePrice', String(salePrice));
            form.append('ingredients', JSON.stringify(
                ingredients.split(',').map(s => s.trim()).filter(Boolean)
            ));
            form.append('sizes', JSON.stringify(
                sizes.split(',').map(s => s.trim()).filter(Boolean)
            ));
            images.forEach(file => {
                form.append('images', file);
            });

            await API.post('/api/products', form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full p-2 sm:p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-1 w-full border rounded p-2"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-1 w-full border rounded p-2"
                        rows={4}
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium">Category</label>
                    <input
                        type="text"
                        list="category-options"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="mt-1 w-full border rounded p-2"
                        placeholder="Type or choose a category (e.g. makeup, skincare)"
                        required
                    />
                    <datalist id="category-options">
                        {categories.map((cat) => (
                            <option key={cat} value={cat} />
                        ))}
                    </datalist>
                </div>

                {/* Featured & Sale toggles */}
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={featured}
                            onChange={e => setFeatured(e.target.checked)}
                            className="mr-2"
                        />
                        Featured
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isOnSale}
                            onChange={e => setIsOnSale(e.target.checked)}
                            className="mr-2"
                        />
                        On Sale?
                    </label>
                </div>

                {/* Price & Sale Price */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Price (ALL)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            className="mt-1 w-full border rounded p-2"
                            min={0}
                            step="0.01"
                            required
                        />
                    </div>
                    {isOnSale && (
                        <div>
                            <label className="block font-medium">Sale Price</label>
                            <input
                                type="number"
                                value={salePrice}
                                onChange={e => setSalePrice(Number(e.target.value))}
                                className="mt-1 w-full border rounded p-2"
                                min={0}
                                step="0.01"
                                required
                            />
                        </div>
                    )}
                </div>

                {/* Stock */}
                <div>
                    <label className="block font-medium">Count In Stock</label>
                    <input
                        type="number"
                        value={countInStock}
                        onChange={e => setCountInStock(Number(e.target.value))}
                        className="mt-1 w-full border rounded p-2"
                        min={0}
                        required
                    />
                </div>

                {/* Ingredients & Sizes */}
                <div>
                    <label className="block font-medium">
                        Ingredients (comma‑separated)
                    </label>
                    <input
                        type="text"
                        value={ingredients}
                        onChange={e => setIngredients(e.target.value)}
                        className="mt-1 w-full border rounded p-2"
                        placeholder="e.g. aloe vera, shea butter, vitamin E"
                    />
                </div>
                <div>
                    <label className="block font-medium">
                        Sizes (comma‑separated)
                    </label>
                    <input
                        type="text"
                        value={sizes}
                        onChange={e => setSizes(e.target.value)}
                        className="mt-1 w-full border rounded p-2"
                        placeholder="e.g. 30ml, 50ml, 100ml"
                    />
                </div>

                {/* Images */}
                <div>
                    <label className="block font-medium">Product Images</label>
                    <div className='mt-1 w-28 border rounded px-3 py-1 bg-gray-400 hover:bg-gray-100 transition duration-300'>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full"
                            required
                        />
                    </div>
                </div>

                {/* Image Previews with Remove & Move buttons */}
                {previewUrls.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-4">
                        {previewUrls.map((url, i) => (
                            <div key={i} className="relative w-24">
                                <img
                                    src={url}
                                    alt={`Preview ${i + 1}`}
                                    className="w-24 h-24 object-cover rounded border"
                                />
                                <div className="absolute top-0 right-0 bg-white p-1 flex flex-col items-end space-y-1">
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="text-red-600 text-xs hover:underline"
                                    >
                                        ✕
                                    </button>
                                    <button
                                        type="button"
                                        disabled={i === 0}
                                        onClick={() => moveImage(i, 'left')}
                                        className="text-xs text-gray-700 hover:underline disabled:text-gray-400"
                                    >
                                        ←
                                    </button>
                                    <button
                                        type="button"
                                        disabled={i === images.length - 1}
                                        onClick={() => moveImage(i, 'right')}
                                        className="text-xs text-gray-700 hover:underline disabled:text-gray-400"
                                    >
                                        →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
                >
                    {loading ? 'Creating…' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};
