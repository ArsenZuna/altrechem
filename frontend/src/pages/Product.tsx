import {ProductView} from "../components/ProductView.tsx";
import {Layout} from "../utils/Layout.tsx";


export const Product = () => {
    return (
        <Layout>
            <div className='pt-[170px] pb-[90px]'>
                <ProductView/>
            </div>
        </Layout>
    )
}