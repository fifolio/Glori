import { Brands, HeroCollections, Newsletter, Perfumes } from "@/components";
import { useParams } from 'react-router-dom';


export default function Collections() {

  // Catch the section name from the URL (To fetch the related data)
  const { collectionID } = useParams<string>();

  return (
    <div className="md:container container-fluid">
      <HeroCollections collectionID={`${collectionID}`} />
      <Perfumes category={`${collectionID}`} quantity={20} AllowFiltering={true} NavigateToCollectionsPageBtn={false}/>
      <Brands />
      <Newsletter />
    </div>
  )
}
