import { account } from "@/backend/configs/config";


export default async function deleteAccount(accountId: string) {

  const res = await account.deleteIdentity(
    `${accountId}`
  ).then(() => {
        return true
    }).catch((err) => {
        return err
    })

   return res
}