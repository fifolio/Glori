import { databases } from "@/backend/configs/config";

type UpdateReviewTypes = {
    reviewId: string;
    review: string;
    rating: string;
}


export async function updateReview(payload: UpdateReviewTypes) {

    let documentData = {
        review: payload.review,
        rating: payload.rating
    }

    const res = await databases.updateDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_REVIEWS}`,
        payload.reviewId,
        documentData
    ).then(() => {
        return true
    }).catch((err) => {
        return err
    })

    return res
}
