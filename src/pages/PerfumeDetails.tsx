import { useState } from 'react'
import { TopSelling, Brands, Newsletter, Perfumes, Perfume, Reviews } from "@/components";


export default function PerfumeDetails() {

  // Store the Perfume category and Brand to export it to <Perfumes/>
  const [category] = useState<string>('luxury'), [brand] = useState<string>('Chanel')





  return (
    <div className="md:container container-fluid">
      <Perfume />
      <Reviews />
      <TopSelling brand={brand} />
      <Perfumes category={`${category}`} quantity={8} AllowFiltering={false} NavigateToCollectionsPageBtn={true} />
      <Brands />
      <Newsletter />
    </div>
  )
}
