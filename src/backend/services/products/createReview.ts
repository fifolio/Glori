import { ID, databases } from "@/backend/configs/config";


export async function createReview(productId: string, userId: string, review: string, rating: string) {

    let documentData = {
        productId: productId,
        userId: userId,
        review: review,
        rating: rating,
        user: userId,
    };

    const res = await databases.createDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_REVIEWS}`,
        ID.unique(),
        documentData
    ).then((response) => {
        return response
    }).catch((err) => {
        return err
    })

    return res
}
