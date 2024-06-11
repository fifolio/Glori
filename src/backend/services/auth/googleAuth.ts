import { OAuthProvider } from 'appwrite'
import { account } from "@/backend/configs/config"

export async function googleAuth() {
    await account.createOAuth2Session(
        OAuthProvider.Google,
        'https://glori.netlify.app',
        'https://glori.netlify.app'
    )
}