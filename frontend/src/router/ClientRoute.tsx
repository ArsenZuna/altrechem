import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../utils/AuthStore';

interface ClientRouteProps {
    children: ReactNode;
}

export const ClientRoute: React.FC<ClientRouteProps> = ({ children }) => {
    const user = useAuthStore((state) => state.user);

    if (!user || user.role !== 'client') {
        useAuthStore.getState().logout();
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};
