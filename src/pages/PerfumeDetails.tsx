import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

// UI
import { Brands, Newsletter, MorePerfumes, Perfume, Reviews } from "@/components";

// SERVICES
import { getLikes } from '@/backend/services/products/getLikes';

// STATES
import useUserId from '@/lib/states/userId';
import useIsLiked from '@/lib/states/useIsLiked';


export default function PerfumeDetails() {

  // Loading Screen for Reviews.tsx
  const [loadingScreen, setLoadingScreen] = useState<boolean>(true);

  const
    { id: perfumeId } = useParams(),
    { loggedinUserId } = useUserId();

  const
  // Pass the current user feedback to its specific section in the UI
  { setIsLiked } = useIsLiked();


  useEffect(() => {
    if (perfumeId !== undefined && loggedinUserId !== undefined) {
      async function getCurrentUserFeedback() {
        await getLikes(`${perfumeId}`, `${loggedinUserId}`)
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
      {/* <TopSelling /> */}
      <MorePerfumes />
      <Brands />
      <Newsletter />
    </div>
  )
}
