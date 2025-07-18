import React, {type ReactNode} from "react";
import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Header/>
            <>
                {children}
            </>
            <Footer/>
        </>
    )
}