import {Hero} from "@/app/(marketing)/_components/Hero";
import {Footer} from "@/app/(marketing)/_components/Footer";


const MarketingPage = ()=>{
    return(
        <div className="min-h-full dark:bg-darkBackground">
            <Hero/>
            <Footer/>
        </div>
    )
}
export default MarketingPage;