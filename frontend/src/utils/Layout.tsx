import React, {type ReactNode} from "react";
import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";
import ScrollButton from "../components/extras/ScrollButton.tsx";
import WhatsAppButton from "../components/extras/WhatsappButton.tsx";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Header/>
            <>
                {children}
                <ScrollButton/>
                <WhatsAppButton/>
            </>
            <Footer/>
        </>
    )
}