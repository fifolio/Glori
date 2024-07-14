import { databases } from "@/backend/configs/config";

export async function getIsHelpful(reviewId: string) {

    const res = await databases.getDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_REVIEWS}`,
        reviewId
    ).then((res) => {
        return res.isHelpful
    }).catch((err) => {
        return err
    })
    
    return res
}
