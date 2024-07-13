import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";

// Fetch all the Reviews based on specific perfumeId
export async function getReviews(perfumeId: string) {

    const results = await databases.listDocuments(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_REVIEWS}`,
        [
            Query.equal('productId', `${perfumeId}`),
        ]
        
    ).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

    return results
}
