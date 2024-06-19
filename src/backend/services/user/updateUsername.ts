import { account } from "@/backend/configs/config";


export default async function updateUsername(username: string) {

  const res = await account.updateName(
    username
  ).then((res) => {
        return res
    }).catch((err) => {
        return err.type 
    })

   return res
}