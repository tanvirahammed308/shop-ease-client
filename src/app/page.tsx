import Banner from "@/components/home/Banner"
import Brand from "@/components/home/Brand"
import Carousel from "@/components/home/Carousel"
import HomeCard from "@/components/home/HomeCard"
import PopularItem from "@/components/home/PopularItem"

import TrendingCarousel from "@/components/home/TrendingCarousel"


const Home = () => {
  return (
    <div className="min-h-screen container mx-auto">
      <Carousel/>
      <HomeCard/>
      <TrendingCarousel/>
      <Banner/>
      <PopularItem/>
      <Brand/>
    </div>
  )
}

export default Home