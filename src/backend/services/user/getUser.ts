import { account } from "@/backend/configs/config";

export default async function getUser(){
    const user = await account.get()
    return user ? user : console.error('Error while getting logged-in user')
}

export async function getUserMetaData(){
    const data = await getUser()
    return data ? data : console.log('User Meta Data is not ready..')
}