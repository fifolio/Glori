import { ID, account } from "@/backend/configs/config"

type signup = {
    email: string,
    password: string,
    username: string
}

export async function signup({ email, password, username }: signup) {


    const res = await account.create(
        ID.unique(),
        email,
        password,
        username
    ).then((res) => {
        return res
    }).catch((err) => {
        return err.type
    })

   return res
}