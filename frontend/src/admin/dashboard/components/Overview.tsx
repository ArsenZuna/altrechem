import React from "react";
import {OrdersToday} from "./OrdersToday.tsx";
import {TopProduct} from "./TopProducts.tsx";
import {FeaturedProducts} from "./FeaturedProducts.tsx";
import {OutOfStockProducts} from "./OutOfStockProducts.tsx";


export const Overview: React.FC = () => {
    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">Admin Overview</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrdersToday />
                <TopProduct />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FeaturedProducts />
                <OutOfStockProducts />
            </div>
        </div>
    );
};
