import Hero from "./_components/hero"
import FoodGrid from "./_features/food-grid"
import Footer from "./_components/footer"
export default function Home() {
    return (
        <div className="">
            <Hero/>
            <FoodGrid/>
            <Footer/>
        </div>
    )
}