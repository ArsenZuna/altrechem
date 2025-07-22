    import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormStatus } from 'react-dom';
import { API } from '../../api/API.js';
import { useAuthStore } from '../../utils/AuthStore.tsx';
import dummy_image from '../../assets/fourth_hero.png';
    import {useTranslation} from "react-i18next";

export const Login = () => {
    const login = useAuthStore((state) => state.login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { pending } = useFormStatus();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const { data: user } = await API.post('/api/auth/login', { email, password });
            login(user);
            localStorage.setItem('token', user.token);
            if (user.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-lg rounded-lg overflow-hidden">
                        {/* Left image */}
                        <div
                            className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${dummy_image})`,
                            }}
                        ></div>

                        {/* Form side */}
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center font-semibold">{t("login.0.header")}!</h3>
                            <form
                                onSubmit={handleSubmit}
                                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                            >
                                {error && (
                                    <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
                                )}

                                {/* Email */}
                                <div className="mb-4">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t("login.0.email_placeholder")}
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-4">
                                    <label
                                        className="block mb-2 text-sm font-bold text-gray-700"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="***************"
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>

                                {/* Submit button */}
                                <div className="mb-6 text-center">
                                    <button
                                        type="submit"
                                        disabled={pending}
                                        className="w-full px-4 py-2 font-bold text-white bg-pink-400/70 rounded-full hover:bg-pink-400 focus:outline-none focus:shadow-outline"
                                    >
                                        {t("login.0.button")}
                                    </button>
                                </div>

                                <hr className="mb-6 border-t" />

                                {/* Links */}
                                <div className="text-center">
                                    <Link
                                        to="/register"
                                        className="inline-block text-sm text-pink-400 align-baseline hover:text-pink-600"
                                    >
                                        {t("login.0.go_to_register")}
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
