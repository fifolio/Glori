import { Brands, HeroProducts, Newsletter } from "@/components";
import { useParams } from 'react-router-dom';


export default function Products() {

  // Catch the section name from the URL (To fetch the related data)
  const { pageID } = useParams<string>();

  return (
    <div className="md:container container-fluid">
      <HeroProducts pageID={`${pageID}`} />
      <Brands />
      <Newsletter />
    </div>
  )
}
