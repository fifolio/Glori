import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";

// Fetch all the Reviews based on specific perfumeId
export async function getReviews(perfumeId: string, ratingFilter?: string, sortBy?: string) {

    // Check for filters validation
    let rating: any;
    if (['1','2','3','4','5'].includes(ratingFilter as string)) {
        rating = Query.equal('rating', `${ratingFilter}`)
    } else {
        rating = Query.notEqual('rating', '6')
    }


    let order: any;
    switch (sortBy) {
        case 'newest':
            order = Query.orderDesc('$createdAt')
            break;
        case 'oldest':
            order = Query.orderAsc('$createdAt')
            break;
        case 'highest':
            order = Query.orderDesc('rating')
            break;
        case 'lowest':
            order = Query.orderAsc('rating')
            break;
        default:
            order = Query.orderDesc('$createdAt')
            break;
    }

    const results = await databases.listDocuments(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_REVIEWS}`,
        [
            Query.equal('productId', `${perfumeId}`),
            rating,
            order
        ]

    ).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

    return results
}
