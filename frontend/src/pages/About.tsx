import {Layout} from "../utils/Layout.tsx";
import {PageIntro} from "../components/PageIntro.tsx";
import HeroImage from "../assets/third_hero.jpg";


export const About = () => {
    return (
        <Layout>
            <PageIntro title='About' />
            <>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mx-32 my-24'>
                    <div className='hidden lg:flex justify-center items-center'>
                        <img src={HeroImage} alt='About' className='object-cover w-[900px] h-[600px] rounded     shadow-2xl '/>
                    </div>
                    <div className='flex justify-center items-center'>
                        <p className='text-lg text-shadow-xs text-justifys tracking-tight'>
                            Tregti me pakice dhe shumice i produkteve ushqimore, cajra, erza,dhe paketimi i tyre,
                            ekstraktime te bimeve medicinale dhe import eksport. Prodhim te vajrave te ndryshme bimore
                            me presim te ftohte si vaj ulliri, kungulli, sinapi, hudhre, kokosi, luledielli, basani etj.
                            Vajra bimore me distilim, rigon, livando, sherebele etj. Laborator per analiza te bimeve dhe mjekesor,
                            kremra bimore, shampo me vajra bimore, perpunime produkteve bujqesore. Sherbime te mjeksise popullore.
                            Klinike mjeksore, laborator mjeksor, sherbime kurative. Kryen cdo veprim tjeter qe lidhet me prodhimin,
                            perpunimin dhe tregtimin ne fushen e produkteve bujqesore ne teresi dhe vecanerisht bimeve mjekesore,
                            ne perputhje me legjislacionin shqiptar ne fuqi. Marketing online (shitblerje online).
                        </p>
                    </div>
                </div>
            </>
        </Layout>
    )
}