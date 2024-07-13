import { ID, account, databases } from "@/backend/configs/config"

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
    ).then(async (res) => {
        console.log(res)
        // Pass the username to the user collection
        await databases.createDocument(
            `${import.meta.env.VITE_DATABASES_MAIN}`,
            `${import.meta.env.VITE_COL_USERS}`,
            res.$id,
            {
                username: username
            }
        ).then(() => {
            return true
        }).catch((err) => {
            console.log('error occur while passing username to the user collection', err)
            return false
        })

    }).catch((err) => {
        return err.type
    })

    return res
}