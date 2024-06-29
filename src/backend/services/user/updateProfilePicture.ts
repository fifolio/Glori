import { Query } from "appwrite";
import { databases } from "@/backend/configs/config";

type avatarDataTypes = {
    userID: string,
    newAvatarUrl: string,
}

// Handle UpdateProfilePicture
export async function handleUpdateAvatar(data: avatarDataTypes) {

    await databases.updateDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_USERS}`,
        data.userID,
        { avatar: data.newAvatarUrl }

    ).then(() => {
        return true
    }).catch((err) => {
        console.log('Error while updating profile picture: >> ', err)
        return false
    })
}


// Get the Logged-in user profile picture
export async function getUserProfilePicture(loggedinUserId: string) {
    const results = await databases.getDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_USERS}`,
        `${loggedinUserId}`,
        [
            Query.select(["avatar"])
        ]
    ).then((res) => {
        let avatar = res.avatar;
        return avatar
    }).catch(() => {
        return false
    })

    return results

}