import { account } from "@/backend/configs/config";


export default async function verify() {
    const res = await account.createVerification(
        `${window.location.origin}/verify`
    ).then(() => {
        return true
    }).catch(() => {
        return false
    })

    return res
}