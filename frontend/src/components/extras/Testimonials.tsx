import {Star} from "lucide-react";
import React from "react";

interface TestimonialData {
    name: string;
    text: string;
    role: string;
    avatar: string;
}

export const Testimonials: React.FC<TestimonialData> = ({name, text, role, avatar}) => {
    return (
        <>
            <div className="group p-6 transition-all duration-500 text-black">
                <div>
                    <div className="flex justify-center items-center mb-3 gap-2 text-yellow-400 text-shadow-lg">
                        <Star size={20} fill="currentColor"/>
                        <Star size={25} fill="currentColor"/>
                        <Star size={30} fill="currentColor"/>
                        <Star size={25} fill="currentColor"/>
                        <Star size={20} fill="currentColor"/>
                    </div>
                    <p className="text-md mg:text-lg tracking-tight italic pb-2 slide-text-active text-shadow-2xs">
                        "{text}"
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center align-middle gap-2 border-t border-gray-200 pt-5">
                    <div>
                        <img className="rounded-full h-20 w-20 object-cover" src={avatar} alt={name}/>
                    </div>
                    <div>
                        <h5 className="text-center text-xl text-shadow-xs font-semibold">{name}</h5>
                        <p className="text-center text-md italic">{role}</p>
                    </div>
                </div>
            </div>
        </>
    )
}