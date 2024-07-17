import { databases } from "@/backend/configs/config";

// Get the Logged-in user extra meta details
export async function getUserExtraMetaData(userId: string) {
    const results = await databases.getDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_USERS}`,
        `${userId}`
    ).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

    return results
}
