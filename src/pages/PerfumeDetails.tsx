import { useEffect, useState } from 'react'
import { TopSelling, Brands, Newsletter, Perfumes, Perfume, Reviews } from "@/components";
import { useParams } from 'react-router-dom';
import useUserId from '@/lib/states/userId';
import useIsLiked from '@/lib/states/useIsLiked';
import { getFeedback } from '@/backend/services/products/getFeedback';


export default function PerfumeDetails() {

  // Loading Screen for Reviews.tsx
  const [loadingScreen, setLoadingScreen] = useState<boolean>(true);

  // Store the Perfume category and Brand to export it to <Perfumes/>
  const
    [category] = useState<string>('luxury'),
    [brand] = useState<string>('Chanel');

  const
    { id: perfumeId } = useParams(),
    { loggedinUserId } = useUserId();

  const
  // Pass the current user feedback to its specific section in the UI
  { setIsLiked } = useIsLiked();


  useEffect(() => {
    if (perfumeId !== undefined && loggedinUserId !== undefined) {
      async function getCurrentUserFeedback() {
        await getFeedback(`${perfumeId}`, `${loggedinUserId}`)
          .then((res) => {
            setIsLiked(res.isLiked)
            setLoadingScreen(false)  
          })
      }
      getCurrentUserFeedback();
    } else {
      console.log('data still undefined')
    }

  }, [])


  return (
    <div className="md:container container-fluid">
      <Perfume />
      <Reviews loadingScreen={loadingScreen} />
      <TopSelling brand={brand} />
      <Perfumes category={`${category}`} quantity={8} AllowFiltering={false} NavigateToCollectionsPageBtn={true} />
      <Brands />
      <Newsletter />
    </div>
  )
}
