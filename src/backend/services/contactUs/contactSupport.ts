import { ID, databases } from "@/backend/configs/config";

type ContactSupportTypes = {
    username: string;
    email: string;
    subject: string;
    message: string;
}

export async function connectSupport(payload: ContactSupportTypes) {

    let documentData = {
        username: payload.username,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
    };

    const res = await databases.createDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_CONNECT_SUPPORT}`,
        ID.unique(),
        documentData

    ).then(() => {
        return true
    }).catch((err) => {
        return err
    })

    return res
}
