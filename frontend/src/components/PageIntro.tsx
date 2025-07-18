import React from "react";
import IntroImage from "../assets/intro_image.jpg"

interface PageIntroProps {
    title: string;
}

export const PageIntro: React.FC<PageIntroProps> = ({title}) => {
    return (
        <section
            className="section relative h-[275px] bg-black bg-cover bg-center bg-no-repeat pt-24"
            style={{backgroundImage: `url(${IntroImage})`}}
        >
            <div className="absolute inset-0 bg-black/60"/>

            <div className='relative z-10 flex justify-center items-center h-full'>
                <h1 className='text-white text-4xl font-bold text-center'>{title}</h1>
            </div>
        </section>
    )
}