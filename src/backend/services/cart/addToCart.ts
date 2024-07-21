import { ID, databases } from "@/backend/configs/config";

type CartDataTypes = {
    userId: string;
    productTitle: string;
    productDetails: string;
    size: number;
    quantity: number;
    defaultPrice: number;
}

// CREATE
export async function addToCart(payload: CartDataTypes) {

    let documentData = {
        userId: payload.userId,
        productTitle: payload.productTitle,
        productDetails: [`${payload.productDetails}`],
        size: payload.size,
        quantity: payload.quantity,
        defaultPrice: payload.defaultPrice,
    };

    const res = await databases.createDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_CARTS}`,
        ID.unique(),
        documentData
    ).then((response) => {
        return response
    }).catch((err) => {

        return err
    })

    return res
}
