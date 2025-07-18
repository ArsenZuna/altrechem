// src/pages/Shop.tsx
import {useEffect, useState} from "react";
import {Layout} from "../utils/Layout";
import {PageIntro} from "../components/PageIntro";
import {API} from "../api/API";
import type {Product} from "../utils/types.tsx";
import {ProductCard} from "../components/ProductCard";
import {FilterSidebar} from "../components/extras/FilterSidebar";
import {Funnel} from "lucide-react";

export const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [sortOption, setSortOption] = useState("Name: A to Z");
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
    const [showSaleOnly, setShowSaleOnly] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        API.get<Product[]>('/api/products')
            .then(res => {
                const allProducts = res.data;
                setProducts(allProducts);
                setFilteredProducts(allProducts);

                const uniqueCategories = [
                    ...new Set(allProducts.map(p => p.category || "Uncategorized"))
                ];
                setCategories(uniqueCategories);
            })
            .catch(err => setError(err.message || 'Failed to load products'))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        let updated = [...products];

        // Category filter
        if (selectedCategories.length > 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            updated = updated.filter(p => selectedCategories.includes(p.category));
        }

        // Price range filter
        updated = updated.filter(p =>
            (p.salePrice || p.price) >= priceRange[0] &&
            (p.salePrice || p.price) <= priceRange[1]
        );

        // Sale-only filter
        if (showSaleOnly) {
            updated = updated.filter(p => p.isOnSale === true);
        }

        // Sorting
        if (sortOption === "Name: A to Z") {
            updated.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "Price: Low to High") {
            updated.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        } else if (sortOption === "Price: High to Low") {
            updated.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        }

        setFilteredProducts(updated);
    }, [products, selectedCategories, priceRange, showSaleOnly, sortOption]);

    if (loading) return <div className='w-full h-screen flex justify-center items-center'>
        <div className="w-32 h-32 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"/>
    </div>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <Layout>
            <PageIntro title="Shop"/>
            <div className="md:flex gap-4 py-10 px-3 lg:px-[40px]">
                <div className="hidden md:block w-64 border-r-2 border-gray-300">
                    <FilterSidebar
                        categories={categories}
                        selectedCategories={selectedCategories}
                        onCategoryChange={setSelectedCategories}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                        showSaleOnly={showSaleOnly}
                        onSaleToggle={() => setShowSaleOnly(!showSaleOnly)}
                    />
                </div>
                <div className="md:hidden px-4 pb-4">
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded shadow"
                    >
                        <Funnel size={16}/> Filters
                    </button>
                </div>
                <div className="flex-1 px-5 pt-5">
                    <div className="flex justify-start items-center mb-4 pb-3">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="border border-gray-300 px-2 py-1 rounded"
                        >
                            <option>Name: A to Z</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                    <div className="flex md:block justify-center items-center mb-4 pb-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mx-auto">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {isFilterOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                     onClick={() => setIsFilterOpen(false)}/>
            )}
            <div
                className={`fixed right-0 top-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
                    isFilterOpen ? "translate-x-0" : "translate-x-full"
                } lg:hidden shadow-xl`}
            >
                <FilterSidebar
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={setSelectedCategories}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    showSaleOnly={showSaleOnly}
                    onSaleToggle={() => setShowSaleOnly(!showSaleOnly)}
                    onClose={() => setIsFilterOpen(false)}
                />
            </div>
        </Layout>
    );
};
