import { account } from "@/backend/configs/config";


export default async function updateEmail(newEmail: string, password: string) {

  const res = await account.updateEmail(
        newEmail,
        password,
    ).then((res) => {
        return res
    }).catch((err) => {
        return err.type 
    })

   return res
}