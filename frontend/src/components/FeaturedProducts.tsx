import React, { useEffect, useState } from 'react';
import { API } from '../api/API';
import type { Product } from "../utils/types.tsx";
import { ProductCard } from "./ProductCard.tsx";
import fourth_hero from "../assets/fourth_hero.png";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/Variants.tsx";
import {useTranslation} from "react-i18next";

export const FeaturedProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {t} = useTranslation();

    useEffect(() => {
        API.get<Product[]>('/api/products')
            .then(res => setProducts(res.data))
            .catch(err => setError(err.message || 'Failed to load'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className="w-32 h-32 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin" />
        </div>
    );

    if (error) return <p className="text-red-600">{error}</p>;

    const featuredProducts = products.filter(p => p.featured).slice(0, 4);

    return (
        <div className='flex justify-center py-10'>
            <div className='container'>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                    <motion.div
                        variants={fadeIn('right')}
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true, amount: 0.3 }}
                        className="hidden lg:block col-span-1">
                        <img
                            src={fourth_hero}
                            alt="fourth"
                            className='w-full lg:h-[750px] xl:h-[530px] object-cover rounded'
                        />
                    </motion.div>

                    <motion.div
                        variants={fadeIn('left')}
                        initial='hidden'
                        whileInView='show'
                        viewport={{ once: true, amount: 0.3 }}
                        className='col-span-3'>
                        <div className='flex justify-center'>
                            <p className='text-4xl font-semibold pt-12 text-pink-400 text-shadow-2xs'>{t("featured_products.0.header")}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center gap-8 md:gap-4 lg:gap-0 pt-10">
                            {featuredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
