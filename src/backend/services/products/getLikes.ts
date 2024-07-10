import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";

// Get the Logged-in user feedback details
export async function getLikes(perfumeId: string, loggedinUserId: string) {
    const results = await databases.listDocuments(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_LIKES}`,
        [
            Query.equal('productId', `${perfumeId}`),
            Query.equal('userId', `${loggedinUserId}`)
        ]
        
    ).then((res) => {
        return res.documents
    }).catch((err) => {
        return err
    })

    return results
}
