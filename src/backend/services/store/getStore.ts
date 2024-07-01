import { databases } from "@/backend/configs/config";

// Get the Logged-in user store details
export async function getStore(loggedinUserId: string) {
    const results = await databases.getDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_STORES}`,
        `${loggedinUserId}`
    ).then((res) => {
        return res
    }).catch((err) => {
        return err
    })

    return results
}
