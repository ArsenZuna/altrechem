import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Testimonials } from './extras/Testimonials.tsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import 'swiper/css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';

export const Reviews: React.FC = () => {
    const { t } = useTranslation();

    const slides = [
        {
            rating: 5,
            text: t("reviews.1.text"),
            name: 'Ciljeta Xhilaga',
            role: t("reviews.1.role"),
            avatar: 'https://iconstyle.al/wp-content/uploads/2023/04/IMG_3705.jpeg'
        },
        {
            rating: 5,
            text: t("reviews.2.text"),
            name: 'Eliona Pitarka',
            role: t("reviews.2.role"),
            avatar: 'https://www.balkanweb.com/wp-content/uploads/2023/10/eliona-aa.jpg'
        },
        {
            rating: 5,
            text: t("reviews.3.text"),
            name: 'Albano Bogdo',
            role: t("reviews.3.role"),
            avatar: 'https://gsh.top-media.al/media10/albano.jpg'
        }
    ];

    return (
        <div className="flex justify-center py-10">
            <div className="flex flex-col items-center p-4">
                <h3 className='text-4xl font-semibold text-pink-400 text-shadow-2xs'>
                    {t("reviews.0.header")}
                </h3>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={30}
                    loop
                    centeredSlides
                    autoplay={{ delay: 4500, disableOnInteraction: false }}
                    className="container w-[350px] md:w-full lg:max-w-screen-xl md:mx-auto"
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
};
