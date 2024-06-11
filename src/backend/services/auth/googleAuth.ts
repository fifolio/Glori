import { OAuthProvider } from 'appwrite'
import { account } from "@/backend/configs/config"

export async function googleAuth() {
    await account.createOAuth2Session(
        OAuthProvider.Google,
        'http://localhost:5173/',
        'http://localhost:5173/'
    )
}