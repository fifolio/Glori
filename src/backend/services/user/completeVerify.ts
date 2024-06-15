import { account } from "@/backend/configs/config";

type completeVerify = {
    userId: string;
    secret?: string;
  }


export default async function completeVerify({ userId, secret }: completeVerify) {

    if(!secret) {
        throw new Error("Secret is required for verification.")
    }

    const res = await account.updateVerification(
        userId,
        secret
    ).then((res) => {
        console.log(res)
        return true
    }).catch((error) => {
        return error
    })

    return res
}