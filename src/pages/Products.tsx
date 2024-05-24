import { Brands, HeroProducts, Newsletter } from "@/components";

export default function Products() {
  return (
    <div className="md:container container-fluid">
      <HeroProducts />
      <Brands />
      <Newsletter />
    </div>
  )
}
