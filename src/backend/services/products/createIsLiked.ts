import { ID, databases } from "@/backend/configs/config";

// Create the loggedin user (Like State) with a new state, that is associated with a specific perfumeId
export async function createIsLiked(userId: string, productId: string, isLiked: boolean) {
    const results = await databases.createDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_LIKES}`,
        ID.unique(),
        {
            productId: productId,
            userId: userId,
            isLiked: isLiked
        }
    ).then((res) => {
        return res;
    }).catch((err) => {
        return err
    })
    return results
}