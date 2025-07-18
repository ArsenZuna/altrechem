import React from 'react';

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

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(e.target.value);
        setCity('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-3xl font-semibold mb-6">Order Details</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div>
                <label className="block text-sm font-medium">Address</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="mt-1 w-full border rounded-lg p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium">Country</label>
                <select value={country} onChange={handleCountryChange} className="mt-1 w-full border rounded-lg p-2" required>
                    <option value="" disabled>Select a country</option>
                    {countries.map(c => <option key={c}>{c}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">City</label>
                <select value={city} onChange={e => setCity(e.target.value)} className="mt-1 w-full border rounded-lg p-2" required disabled={!country}>
                    <option value="" disabled>Select a city</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">Postal Code</label>
                <input type="text" value={postalCode} onChange={e => setPostalCode(e.target.value)} className="mt-1 w-full border rounded-lg p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium">Payment Method</label>
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="mt-1 w-full border rounded-lg p-2" required>
                    <option>Cash on Delivery</option>
                    <option disabled>PayPal (Coming Soon)</option>
                    <option disabled>Credit Card (Coming Soon)</option>
                </select>
            </div>
            <button type="submit" className="w-full bg-blue-300 hover:bg-blue-400 text-white py-2 rounded-xl font-semibold" disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
            </button>
        </form>
    );
};
