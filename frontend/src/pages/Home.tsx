import {Hero} from "../components/Hero.tsx";
import {Features} from "../components/Features.tsx";
import {FeaturedProducts} from "../components/FeaturedProducts.tsx";
import {VideoSection} from "../components/VideoSection.tsx";
import {Reviews} from "../components/Reviews.tsx";
import {Layout} from "../utils/Layout.tsx";


export const Home = () => {
    return (
        <Layout>
            <div className='overflow-x-hidden'>
                <Hero />
                <Features />
                <FeaturedProducts/>
                <VideoSection/>
                <Reviews />
            </div>
        </Layout>
    )
}