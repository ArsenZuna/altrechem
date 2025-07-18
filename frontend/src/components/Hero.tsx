import first_hero from '../assets/first_hero.jpg';
import second_hero from '../assets/second_hero.jpg';
import third_hero from '../assets/third_hero.jpg';
import fourth_hero from '../assets/fourth_hero.png';
import {Carousel} from './extras/Carousel.tsx';

export const Hero = () => {
    const images = [first_hero, second_hero, third_hero];
    const captions = [
        <span>Miresevini ne Altrechem</span>,
        <span>Mjekime efektive</span>,
        <span>Pa efekte anesore</span>,
    ];

    return (
        <section className="container mx-auto pt-28">
            <div className="grid grid-cols-1 md:grid-cols-4 h-[500px] md:h-[600px] lg:h-[700px]">
                {/* Carousel */}
                <div className="col-span-3 relative overflow-hidden m-5">
                    <Carousel images={images} captions={captions} />
                </div>

                {/* Sidebar (blank for now) */}
                <div className="hidden md:block col-span-1 mt-5 mb-5">
                    <img src={fourth_hero} alt="fourth" className='w-full h-full object-cover '/>
                </div>
            </div>
        </section>
    );
};
