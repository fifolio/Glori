import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";

// Get the Logged-in user store details
export async function getProducts(storeId: string) {
    const results = await databases.listDocuments(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_PRODUCTS}`,
        [
            Query.equal('store', `${storeId}`)
        ]
    ).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

    return results
}
