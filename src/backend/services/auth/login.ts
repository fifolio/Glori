import { account } from "@/backend/configs/config"

type Login = {
    email: string,
    password: string,
}

export async function login({ email, password }: Login) {

    const res = await account.createEmailPasswordSession(
        email,
        password,
    ).then((res) => {
        return res
    }).catch((err) => {
        return err.type
    })

   return res
}