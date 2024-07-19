import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";


export async function handleDeleteAllCartItems(userId: string) {

    // Query documents by userId in the cart collection
    await databases.listDocuments(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_CARTS}`,
        [
            Query.equal('userId', `${userId}`)
        ]
    ).then(async (queryResponse) => {

        if (queryResponse.total > 0) {

            for (const document of queryResponse.documents) {
                await databases.deleteDocument(
                    `${import.meta.env.VITE_DATABASES_MAIN}`,
                    `${import.meta.env.VITE_COL_CARTS}`,
                    document.$id
                )
            }
        }
        return true
    }).catch((err) => {
        return err
    })
}
