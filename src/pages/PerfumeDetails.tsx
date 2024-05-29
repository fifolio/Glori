import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { TopSelling, Brands, Newsletter, Perfumes, Perfume, Reviews } from "@/components";



export default function PerfumeDetails() {

  // Catch the section name from the URL (To fetch the related data)
  const { perfumeID } = useParams<string>();

  // Store the Perfume category and Brand to export it to <Perfumes/>
  const [category] = useState<string>('luxury'), [brand] = useState<string>('Chanel')

  return (
    <div className="md:container container-fluid">
      <Perfume perfumeID={`${perfumeID}`} />
      <Reviews />
      <TopSelling brand={brand} />
      <Perfumes category={`${category}`} quantity={8} AllowFiltering={false} NavigateToCollectionsPageBtn={true} />
      <Brands />
      <Newsletter />
    </div>
  )
}
