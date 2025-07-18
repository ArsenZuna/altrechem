import {useState} from 'react';
import {motion} from 'framer-motion';
import {fadeIn} from '../utils/Variants';
import {ModalVideo} from './extras/ModalVideo.tsx';
import {Play} from 'lucide-react';
import Background from '../assets/natural_cosmetics.jpg';
import {InstagramEmbed} from "react-social-media-embed";

export const VideoSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.section
            variants={fadeIn('down')}
            initial="hidden"
            whileInView="show"
            viewport={{once: true, amount: 0.2}}
            className="section relative lg:h-[712px] bg-black bg-cover bg-center bg-no-repeat"
            style={{backgroundImage: `url(${Background})`}}
        >
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/60"/>

            {/* Content wrapper */}
            <div className="relative z-10 container ml-8 md:ml-24 h-full flex items-center">
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                    <div className="col-span-3 text-white py-16 lg:pt-48 pr-16 lg:pl-16">
                        <motion.h3
                            variants={fadeIn('down')}
                            className="text-3xl lg:text-6xl leading-[1.1] -tracking-[1.5px] capitalize mb-8"
                        >
                            Altrechem Media
                        </motion.h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <motion.div variants={fadeIn('down')}>
                            <div
                                onClick={() => setIsOpen(true)}
                                className="flex items-center gap-x-5 cursor-pointer hover:opacity-80 transition pt-5"
                            >
                                <div
                                    className="w-[70px] h-[70px] lg:w-[90px] lg:h-[90px] border border-white/40 rounded-full p-[5px] lg:p-[8px] flex items-center justify-center">
                                    <div
                                        className="bg-red-700 w-full h-full rounded-full flex justify-center items-center">
                                        <Play className="text-white"/>
                                    </div>
                                </div>
                                <div className="uppercase font-semibold">Shiko</div>
                            </div>
                        </motion.div>

                        <ModalVideo
                            isOpen={isOpen}
                            onClose={() => setIsOpen(false)}
                            videoSrc="https://youtu.be/0cOdnLsD0ho"
                        />
                    </div>
                    <div className='hidden md:block col-span-1 ml-16 mb-8 lg:mb-0'>
                        <div>
                            <InstagramEmbed
                                url="https://www.instagram.com/reel/DEnf31QtGJW/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                                width={450} height={660}/>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};