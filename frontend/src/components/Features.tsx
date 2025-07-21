import {motion} from 'framer-motion';
import {getContainerVariants, getItemVariants} from "../utils/Variants.tsx";
import {Vegan, BadgeCheck, Truck, HandCoins} from "lucide-react";
import {useTranslation} from "react-i18next";

export const Features = () => {
    const container = getContainerVariants();
    const item = getItemVariants();
    const {t} = useTranslation();

    return (
        <div className='container mx-auto w-full p-10'>
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className='grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
                <motion.div
                    variants={item}
                    className='flex flex-col justify-center'>
                    <div className='flex justify-center'>
                        <div>
                            <BadgeCheck size={65} strokeWidth={1}/>
                        </div>
                    </div>
                    <h3 className='text-black text-lg md:text-2xl font-semibold text-center pt-2 text-shadow-xs'>{t("features.0")}</h3>
                </motion.div>
                <motion.div
                    variants={item}
                    className='flex flex-col justify-center'>
                    <div className='flex justify-center'>
                        <div>
                            <Vegan size={65} strokeWidth={1}/>
                        </div>
                    </div>
                    <h3 className='text-black text-lg md:text-2xl font-semibold text-center pt-2 text-shadow-xs'>{t("features.1")}</h3>
                </motion.div>
                <motion.div
                    variants={item}
                    className='flex flex-col justify-center'>
                    <div className='flex justify-center'>
                        <div>
                            <HandCoins size={65} strokeWidth={1}/>
                        </div>
                    </div>
                    <h3 className='text-black text-lg md:text-2xl font-semibold text-center pt-2 text-shadow-xs'>{t("features.2")}</h3>
                </motion.div>
                <motion.div
                    variants={item}
                    className='flex flex-col justify-center'>
                    <div className='flex justify-center'>
                        <div>
                            <Truck size={65} strokeWidth={1}/>
                        </div>
                    </div>
                    <h3 className='text-black text-lg md:text-2xl font-semibold text-center pt-2 text-shadow-xs'>{t("features.3")}</h3>
                </motion.div>
            </motion.div>
        </div>
    )
}