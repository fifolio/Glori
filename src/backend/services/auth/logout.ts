import { account } from "@/backend/configs/config"


export async function logout() {
    const isLoggedOut = await account.deleteSession('current');
    return isLoggedOut ? true : false
}