import React from "react";
import { X } from "lucide-react";
import {useTranslation} from "react-i18next";

interface Props {
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
    priceRange: [number, number];
    onPriceChange: (range: [number, number]) => void;
    showSaleOnly: boolean;
    onSaleToggle: () => void;
    onClose?: () => void;
}

export const FilterSidebar: React.FC<Props> = ({
                                                   categories,
                                                   selectedCategories,
                                                   onCategoryChange,
                                                   priceRange,
                                                   onPriceChange,
                                                   showSaleOnly,
                                                   onSaleToggle,
                                                   onClose,
                                               }) => {
    const {t} = useTranslation();
    const handleCheckboxChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            onCategoryChange(selectedCategories.filter(c => c !== category));
        } else {
            onCategoryChange([...selectedCategories, category]);
        }
    };

    return (
        <div className="p-4 space-y-6">
            {onClose && (
                <div className="flex justify-end">
                    <X className="cursor-pointer" onClick={onClose} />
                </div>
            )}

            <div>
                <h4 className="font-semibold mb-2">{t("shop.0.sidebar.0.categories")}</h4>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCheckboxChange(category)}
                            />
                            <span className="text-sm">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold mb-2">{t("shop.0.sidebar.0.price")}</h4>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        className="w-full border p-1 rounded"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) =>
                            onPriceChange([Number(e.target.value), priceRange[1]])
                        }
                    />
                    <span>-</span>
                    <input
                        type="number"
                        className="w-full border p-1 rounded"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) =>
                            onPriceChange([priceRange[0], Number(e.target.value)])
                        }
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={showSaleOnly}
                    onChange={onSaleToggle}
                    id="sale"
                />
                <label htmlFor="sale" className="text-sm">{t("shop.0.sidebar.0.sale")}</label>
            </div>
        </div>
    );
};
