import { Brands, Features, Hero, MoreProducts, Newsletter, TopSelling } from "@/components";

export default function Home() {
  
  return (
    <div className="md:container container-fluid">
      <Hero />
      <Features />
      <TopSelling />
      <MoreProducts />
      <Brands />
      <Newsletter />
    </div>
  )
}
