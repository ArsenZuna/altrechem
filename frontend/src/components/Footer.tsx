import {Facebook, Instagram, Youtube} from 'lucide-react';
import {motion} from 'framer-motion';
import Logo from '../assets/logo.png';
import {getContainerVariants, getItemVariants} from "../utils/Variants.tsx";

export const Footer = () => {
    const container = getContainerVariants();
    const item = getItemVariants();

    const facebookButton = () => {
        window.open('https://www.facebook.com/profile.php?id=61571221151288', '_blank');
    }

    const instagramButton = () => {
        window.open('https://www.instagram.com/altrechem_official', '_blank');
    }

    const youtubeButton = () => {
        window.open('https://www.youtube.com/@altrechem9442', '_blank');
    }

    return (
        <>
            <footer className="bg-black/90 text-white py-6 md:py-12">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
                >

                    <motion.div
                        variants={item}
                        className='col-span-2 hidden md:flex justify-center items-center'>
                        <img src={Logo} alt="Logo" className="w-52 h-52"/>
                        <p className='ml-16'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={item}
                        className='col-span-1 flex justify-center items-center gap-8 pb-5'>
                        <Facebook size={42} className="cursor-pointer text-white hover:text-pink-400 transition-all duration-300" onClick={facebookButton}/>
                        <Instagram size={42} className="cursor-pointer text-white hover:text-pink-400 transition-all duration-300" onClick={instagramButton}/>
                        <Youtube size={42} className="cursor-pointer text-white hover:text-pink-400 transition-all duration-300" onClick={youtubeButton}/>
                    </motion.div>

                </motion.div>

                {/* Copyright */}
                <div className="container mx-auto px-4 pt-2 border-t border-white/50">
                    <p className="text-gray-400 text-sm">
                        © 2025 Altrechem. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    )
};