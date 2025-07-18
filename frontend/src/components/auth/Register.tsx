import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API } from '../../api/API.js';
import dummy_image from '../../assets/fourth_hero.png';

const countryCityMap: Record<string, string[]> = {
    Albania: ['Berat', 'Diber', 'Durres', 'Elbasan', 'Fier', 'Gjirokaster', 'Korce', 'Kukes', 'Lezhe', 'Shkoder', 'Tirane', 'Vlore'],
    Kosovo: ['Pristina', 'Peja', 'Gjakova', 'Mitrovica', 'Prizren', 'Gjilan', 'Ferizaj', 'Fushe Kosove']
};

export const Register = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(e.target.value);
        setCity('');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const { data } = await API.post('/api/auth/register', {
                name,
                lastname,
                email,
                password,
                country,
                city,
                address,
                phone,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const countries = Object.keys(countryCityMap);
    const cities = country ? countryCityMap[country] : [];

    return (
        <div className="font-sans bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-lg rounded-lg overflow-hidden">
                        {/* Form side (left) */}
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-r-none">
                            <h3 className="pt-4 text-2xl text-center font-semibold">Create an Account</h3>
                            <form
                                onSubmit={handleSubmit}
                                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                            >
                                {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded" required />
                                    <input type="text" placeholder="Lastname" value={lastname} onChange={e => setLastname(e.target.value)} className="border p-2 rounded" required />
                                </div>
                                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-4 border p-2 rounded" required />
                                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-4 border p-2 rounded" required />
                                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full mt-4 border p-2 rounded" required />

                                <select value={country} onChange={handleCountryChange} className="w-full mt-4 border p-2 rounded" required>
                                    <option value="" disabled>Select a country</option>
                                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>

                                <select value={city} onChange={e => setCity(e.target.value)} className="w-full mt-4 border p-2 rounded" disabled={!country} required>
                                    <option value="" disabled>Select a city</option>
                                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>

                                <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} className="w-full mt-4 border p-2 rounded" required />
                                <input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full mt-4 border p-2 rounded" required />

                                <button
                                    type="submit"
                                    className="w-full mt-4 py-2 font-bold text-white bg-pink-400/70 rounded-full hover:bg-pink-400"
                                >
                                    Sign Up
                                </button>

                                <hr className="my-6 border-t" />
                                <div className="text-center">
                                    <Link to="/login" className="text-sm text-pink-400 hover:text-pink-600">
                                        Already have an account? Login
                                    </Link>
                                </div>
                            </form>
                        </div>

                        {/* Right image */}
                        <div
                            className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${dummy_image})`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
