import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AdminRoute} from "./AdminRoute.tsx";
import {ClientRoute} from "./ClientRoute.tsx";
import {Login} from "../components/auth/Login.tsx";
import {Register} from "../components/auth/Register.tsx";
import {Dashboard} from "../admin/pages/Dashboard.tsx";
import {Profile} from "../pages/Profile.tsx";
import {Home} from "../pages/Home.tsx";
import {Products} from "../admin/pages/Products.tsx";
import {Orders} from "../admin/pages/Orders.tsx";
import {Finances} from "../admin/pages/Finances.tsx";
import {About} from "../pages/About.tsx";
import {Contact} from "../pages/Contact.tsx";
import {Shop} from "../pages/Shop.tsx";
import {Product} from "../pages/Product.tsx";
import {Checkout} from "../pages/Checkout.tsx";

export const Routes = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/about',
            element: <About />,
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/contact',
            element: <Contact />,
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/shop',
            element: <Shop />,
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/products/:productId',
            element: <Product />,
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/cart/checkout',
            element: (
                <ClientRoute>
                    <Checkout />
                </ClientRoute>
            ),
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/login',
            element: <Login/>,
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/register',
            element: <Register/>,
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/dashboard',
            element: (
                <AdminRoute>
                    <Dashboard />
                </AdminRoute>
            ),
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/dashboard/products',
            element: (
                <AdminRoute>
                    <Products />
                </AdminRoute>
            ),
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/dashboard/orders',
            element: (
                <AdminRoute>
                    <Orders />
                </AdminRoute>
            ),
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/dashboard/finances',
            element: (
                <AdminRoute>
                    <Finances />
                </AdminRoute>
            ),
            errorElement: <h1>404 NOT FOUND</h1>
        },
        {
            path: '/profile',
            element: (
                <ClientRoute>
                    <Profile />
                </ClientRoute>
            ),
            errorElement: <h1>404 NOT FOUND</h1>
        },
    ]);

    return <RouterProvider router={router}/>;
};