import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState, type ReactNode } from 'react';

interface CarouselProps {
    images: string[];
    captions?: ReactNode[];            // optional captions per slide
}

export const Carousel: React.FC<CarouselProps> = ({ images, captions = [] }) => {
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const prev = () =>
        setCurrent(prevIdx => (prevIdx === 0 ? images.length - 1 : prevIdx - 1));
    const next = () =>
        setCurrent(prevIdx => (prevIdx + 1) % images.length);

    return (
        <div className="relative w-full h-full">
            {images.map((src, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                        idx === current ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img
                        src={src}
                        alt={`slide-${idx}`}
                        className="w-full h-full object-cover shadow-2xl"
                    />
                    {/* Black overlay */}
                    <div className="absolute inset-0 bg-black/40" />
                    {/* Centered caption */}
                    {captions[idx] && (
                        <div className="absolute inset-0 flex items-center justify-center px-4">
                            <div className="text-white text-2xl md:text-4xl text-center">
                                {captions[idx]}
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Prev / Next Buttons */}
            <ChevronLeft size={32} onClick={prev} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:scale-125 transition-all duration-300 rounded-full p-2"/>
            <ChevronRight size={32} onClick={next} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:scale-125 transition-all duration-300 rounded-full p-2"/>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, idx: number) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                            idx === current
                                ? 'bg-white'
                                : 'bg-white bg-opacity-50 hover:bg-opacity-80'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};
