import { account } from "@/backend/configs/config"


export async function checkSession() {
    const results = await account.getSession('current')
    return results ? true : false
}