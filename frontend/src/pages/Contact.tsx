import {Layout} from "../utils/Layout.tsx";
import {PageIntro} from "../components/PageIntro.tsx";


export const Contact = () => {
    return (
        <Layout>
            <PageIntro title='Contact' />
            <>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 pt-20 pb-20 mx-32'>
                    <div className='flex flex-col justify-center gap-5'>
                        <h2 className='text-4xl font-semibold text-pink-400/70 text-start'>Na vizitoni</h2>
                        <p className='text-lg text-shadow-xs text-justify tracking-tight'>
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
                    <div className='flex justify-center items-center'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1009.1169194935419!2d19.8462073579587!3d41.34691394182334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350313f5f97fa7b%3A0x65027fa163911e58!2sALTREChem!5e0!3m2!1sen!2s!4v1747963627916!5m2!1sen!2s"
                            width="800" height="650" allowFullScreen={true} loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade" className='rounded shadow-2xl'></iframe>
                    </div>
                </div>
            </>
        </Layout>
    )
}