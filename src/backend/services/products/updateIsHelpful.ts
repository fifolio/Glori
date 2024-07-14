import { databases } from "@/backend/configs/config";

export async function updateIsHelpful(reviewId: string, updatedIsHelpfulArray: string[]) {

        const res = await databases.updateDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_REVIEWS}`,
        reviewId,
        {
            isHelpful: updatedIsHelpfulArray
        }
    ).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

    return res
}
