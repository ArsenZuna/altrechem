import React from 'react';
import {useTranslation} from "react-i18next";

interface Props {
    address: string;
    setAddress: (val: string) => void;
    city: string;
    setCity: (val: string) => void;
    postalCode: string;
    setPostalCode: (val: string) => void;
    country: string;
    setCountry: (val: string) => void;
    paymentMethod: string;
    setPaymentMethod: (val: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    error: string;
    loading: boolean;
}

const countryCityMap: Record<string, string[]> = {
    Albania: ['Berat', 'Diber', 'Durres', 'Elbasan', 'Fier', 'Gjirokaster', 'Korce', 'Kukes', 'Lezhe', 'Shkoder', 'Tirane', 'Vlore'],
    Kosovo: ['Pristina', 'Peja', 'Gjakova', 'Mitrovica', 'Prizren', 'Gjilan', 'Ferizaj', 'Fushe Kosove']
};

export const OrderForm: React.FC<Props> = ({
                                               address, setAddress,
                                               city, setCity,
                                               postalCode, setPostalCode,
                                               country, setCountry,
                                               paymentMethod, setPaymentMethod,
                                               handleSubmit,
                                               error,
                                               loading
                                           }) => {
    const countries = Object.keys(countryCityMap);
    const cities = country ? countryCityMap[country] : [];
    const {t} = useTranslation();

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(e.target.value);
        setCity('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-3xl font-semibold mb-6">{t("order.0.header")}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div>
                <label className="block text-sm font-medium">{t("order.0.input.0.address")}</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="mt-1 w-full border rounded-lg p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium">{t("order.0.input.1.country.0.text")}</label>
                <select value={country} onChange={handleCountryChange} className="mt-1 w-full border rounded-lg p-2" required>
                    <option value="" disabled>{t("order.0.input.1.country.0.placeholder")}</option>
                    {countries.map(c => <option key={c}>{c}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">{t("order.0.input.2.city")}</label>
                <select value={city} onChange={e => setCity(e.target.value)} className="mt-1 w-full border rounded-lg p-2" required disabled={!country}>
                    <option value="" disabled>Select a city</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">{t("order.0.input.3.postal")}</label>
                <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="mt-1 w-full border rounded-lg p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium">{t("order.0.input.4.payment.0.text")}</label>
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="mt-1 w-full border rounded-lg p-2" required>
                    <option>{t("order.0.input.4.payment.0.option")}</option>
                </select>
            </div>
            <button type="submit" className="w-full bg-blue-300 hover:bg-blue-400 text-white py-2 rounded-xl font-semibold" disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
            </button>
        </form>
    );
};
