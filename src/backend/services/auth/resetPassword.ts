import { account } from "@/backend/configs/config";


export default async function resetPassword(email: string) {
    const res = await account.createRecovery(
        email,
        `${window.location.origin}/reset`
    ).then(() => {
        return true
    }).catch(() => {
        return false
    })

    return res
}