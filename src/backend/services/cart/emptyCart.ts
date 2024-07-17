import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";


export async function emptyCart(userId: string) {


    const res = await databases.listDocuments(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_CARTS}`,
        [
            Query.equal('userId', `${userId}`)
        ]
    ).then(async (res) => {
        // Check if any document are found
        if (res.total > 0) {
            // Iterate over each document and delete it
            for (const document of res.documents) {
                await databases.deleteDocument(
                    `${import.meta.env.VITE_DATABASES_MAIN}`,
                    `${import.meta.env.VITE_COL_CARTS}`,
                    document.$id
                )
            }
            return true
        }
    }).catch((err) => {
        return err
    })

    return res
}
