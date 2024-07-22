import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";

// Get the Logged-in user store details
export async function getProducts(storeId: string, sortBy?: string) {

    let order: any;
    switch (sortBy) {
        case 'newest':
            order = Query.orderDesc('$createdAt')
            break;
        case 'oldest':
            order = Query.orderAsc('$createdAt')
            break;
        case 'highest':
            order = Query.orderDesc('price')
            break;
        case 'lowest':
            order = Query.orderAsc('price')
            break;
        default:
            order = Query.orderDesc('$createdAt')
            break;
    }

    const results = await databases.listDocuments(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_PRODUCTS}`,
        [
            Query.equal('store', `${storeId}`),
            order
        ]
    ).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

    return results
}
