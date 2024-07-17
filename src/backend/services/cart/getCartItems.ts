import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";

// Get the Logged-in user store details
export async function getCartItems(userId: string) {
    const results = await databases.listDocuments(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_CARTS}`,
        [
            Query.equal('userId', `${userId}`)
        ]
    ).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

    return results
}
