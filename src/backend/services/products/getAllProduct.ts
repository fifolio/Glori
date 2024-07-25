import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";

export async function getAllProducts(collection?: string, sortBy?: string, cursor?: string, limits?: number) {

    // Check upon the type of orders from the list below that equals to that got received
    let order;
    switch (sortBy) {
        case 'newest':
            order = Query.orderDesc('$createdAt');
            break;
        case 'oldest':
            order = Query.orderAsc('$createdAt');
            break;
        case 'highest':
            order = Query.orderDesc('price');
            break;
        case 'lowest':
            order = Query.orderAsc('price');
            break;
        default:
            order = Query.orderDesc('$createdAt');
            break;
    }

    const queries = [
        order,
        Query.limit(limits ? limits : 10)
    ];

    if(collection){
        queries.push(Query.equal('collection', `${collection}`));
    }

    if (cursor) {
        queries.push(Query.cursorAfter(cursor));
    }


    try {
        const results = await databases.listDocuments(
            `${import.meta.env.VITE_DATABASES_MAIN}`,
            `${import.meta.env.VITE_COL_PRODUCTS}`,
            queries
        );

        return results;
    } catch (err) {
        return err;
    }
}
