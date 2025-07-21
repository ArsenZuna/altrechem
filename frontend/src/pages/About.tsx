import {Layout} from "../utils/Layout.tsx";
import {PageIntro} from "../components/PageIntro.tsx";
import HeroImage from "../assets/third_hero.jpg";
import {useTranslation} from "react-i18next";


export const About = () => {
    const {t} = useTranslation();

    return (
        <Layout>
            <PageIntro title={t("about.0.header")} />
            <>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mx-4 my-16 md:mx-32 lg:my-24'>
                    <div className='hidden lg:flex justify-center items-center'>
                        <img src={HeroImage} alt='About' className='object-cover w-[900px] h-[600px] rounded shadow-2xl '/>
                    </div>
                    <div className='flex justify-center items-center'>
                        <p className='text-lg text-shadow-xs md:text-justify tracking-tight'>
                            {t("about.0.text")}
                        </p>
                    </div>
                </div>
            </>
        </Layout>
    )
}