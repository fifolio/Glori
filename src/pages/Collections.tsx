import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// UI
import { Brands, HeroCollections, Newsletter, Perfumes } from "@/components";

// STATES
import usePerfumeCategory from '@/lib/states/usePerfumeCategory';


export default function Collections() {

  const
    // Catch the section name from the URL (To fetch the related data)
    { id: collectionID } = useParams<string>(),
    { setCategory } = usePerfumeCategory();

  useEffect(() => {
    setCategory(`${collectionID}`)
  }, [collectionID])


  return (
    <div className="md:container container-fluid">
      <HeroCollections collectionID={`${collectionID}`} />
      <Perfumes />
      <Brands />
      <Newsletter />
    </div>
  )
}
