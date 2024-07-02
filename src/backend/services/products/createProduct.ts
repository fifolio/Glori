import { ID, databases } from "@/backend/configs/config";

type CreateProductDataTypes = {
    userID: string;
    title: string;
    description: string;
    price: string;
    size: string;
    fragranceFamily: string;
    ingredients: string[];
    fragranceNotes: string[];
    usage: string;
    longevity: string;
    sillage: string;
    occasion: string;
    photos: string[];
}

// CREATE
export async function handleCreateProduct(payload: CreateProductDataTypes) {

    let documentData = {
        userId: payload.userID,
        title: payload.title,
        description: payload.description,
        price: payload.price,
        size: payload.size,
        fragranceFamily: payload.fragranceFamily,
        ingredients: payload.ingredients,
        fragranceNotes: payload.fragranceNotes,
        usage: payload.usage,
        longevity: payload.longevity,
        sillage: payload.sillage,
        occasion: payload.occasion,
        photos: payload.photos,
    };

    const res = await databases.createDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_STORES}`,
        ID.unique(),
        documentData

    ).then((response) => {
        return response
    }).catch((err) => {

        return err
    })

    return res
}
