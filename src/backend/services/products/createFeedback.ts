import { ID, databases } from "@/backend/configs/config";

type CreateFeedbackDataTypes = {
    productId: string;
    userId: string;
    isLiked: boolean;
    rating: number;
    comment: string;
    isHelpful: number;
}

// CREATE
export async function handleCreateFeedback(payload: CreateFeedbackDataTypes) {

    let documentData = {
        productId: payload.productId,
        userId: payload.userId,
        isLiked: payload.isLiked,
        rating: payload.rating,
        comment: payload.comment,
        isHelpful: payload.isHelpful,
    };

    const res = await databases.createDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_FEEDBACK}`,
        ID.unique(),
        documentData
    ).then((response) => {
        console.log(response)
        return response
    }).catch((err) => {

        return err
    })

    return res
}
