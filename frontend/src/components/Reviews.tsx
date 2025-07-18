import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay }  from 'swiper/modules';
import { Testimonials } from './extras/Testimonials.tsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import 'swiper/css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import 'swiper/css/pagination';

const slides = [
    {
        rating: 5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
            'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
            'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
            'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        name: 'Ciljeta Xhilaga',
        role: 'Client',
        avatar: 'https://iconstyle.al/wp-content/uploads/2023/04/IMG_3705.jpeg'
    },
    {
        rating: 5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
            'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
            'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
            'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        name: 'Eliona Pitarka',
        role: 'Client',
        avatar: 'https://www.balkanweb.com/wp-content/uploads/2023/10/eliona-aa.jpg'
    },
    {
        rating: 5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
            'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
            'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
            'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        name: 'Albano Bogdo',
        role: 'Client',
        avatar: 'https://gsh.top-media.al/media10/albano.jpg'
    }
];

export const Reviews: React.FC = () => (
    <div className="flex justify-center py-10 ">
        <div className="flex flex-col items-center p-4">
            <div>
                <h3 className='text-4xl font-semibold text-pink-400 text-shadow-2xs'>Vleresimet nga klientet</h3>
            </div>
            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={30}
                loop
                centeredSlides
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                className="container w-[450px] md:w-full lg:max-w-screen-xl mx-auto"
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <Testimonials {...slide} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
);