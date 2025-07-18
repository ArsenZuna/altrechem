import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../utils/AuthStore';

interface AdminRouteProps {
    children: ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const user = useAuthStore((state) => state.user);

    if (!user || user.role !== 'admin') {
        // clear only our auth, not everything
        useAuthStore.getState().logout();
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};
