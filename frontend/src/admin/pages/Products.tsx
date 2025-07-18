import { useState } from "react";
import { Layout } from "../partials/Layout.tsx";
import { AddProductForm } from "../dashboard/extras/AddProductForm.tsx";
import { ProductsTable } from "../dashboard/components/ProductsTable.tsx";

export const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Layout>
            <h2 className="text-3xl font-semibold pt-8">Products</h2>

            {/* Product Table */}
            <ProductsTable />

            {/* Add Product Button */}
            <div className="flex justify-end mt-6 mr-5">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-xl text-black bg-pink-400/70 p-4 hover:bg-green-700 hover:text-white rounded"
                >
                    Add Product
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-2 sm:px-4 overflow-y-auto">
                    <div className="relative bg-white w-full max-w-3xl rounded-lg shadow-lg p-4 sm:p-6 my-10 max-h-[90vh] overflow-y-auto">
                        {/* Close button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-3 text-gray-500 text-2xl hover:text-red-600"
                        >
                            &times;
                        </button>

                        <AddProductForm />
                    </div>
                </div>
            )}
        </Layout>
    );
};
