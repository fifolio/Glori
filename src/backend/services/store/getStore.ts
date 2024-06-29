import { databases } from "@/backend/configs/config";

// Get the Logged-in user store details
export async function checkOnUserStoreState(loggedinUserId: string) {
    const results = await databases.getDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_STORES}`,
        `${loggedinUserId}`
    ).then((res) => {
        return res
    }).catch(() => {
        return false
    })

    return results
}
