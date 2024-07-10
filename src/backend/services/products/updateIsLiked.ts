import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";

// Update the loggedin user (Like State) with a new state, that is associated with a specific perfumeId
export async function updateIsLiked(userId: string, productId: string, isLiked: boolean) {
    const results = await databases.listDocuments(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_LIKES}`,
        [
            Query.equal('userId', `${userId}`),
            Query.equal('productId', `${productId}`)
        ]
    ).then(async (res) => {

        const documentId = res?.documents[0].$id;
        let data = {
            isLiked: isLiked,
        };

        // Check if the document is ready, then call the updating function
        if (documentId) {
            const isLikedRes = await databases.updateDocument(
                `${import.meta.env.VITE_DATABASES_MAIN}`,
                `${import.meta.env.VITE_COL_LIKES}`,
                documentId,
                data
            ).then((res) => {
                return res
            }).catch((err) => {
                console.log(err)
            })
            return isLikedRes
        }
        return res;
    }).catch((err) => {
        return err
    })
    return results
}
 