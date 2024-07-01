import { databases } from "@/backend/configs/config";

type UpdateSotreDataTypes = {
    userID: string;
    name: string;
    logoUrl: string;
    bio: string;
    email: string;
    phone: string;
    website: string;
    instagram: string;
    x: string;
    facebook: string;
    youtube: string;
}

// UPDATE
export async function handleUpdateStore(payload: UpdateSotreDataTypes) {

    let documentData = {
        name: payload.name,
        logo: payload.logoUrl,
        bio: payload.bio,
        email: payload.email,
        phone: payload.phone,
        website: payload.website,
        instagram: payload.instagram,
        x: payload.x,
        facebook: payload.facebook,
        youtube: payload.youtube
    };

    const res = await databases.updateDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_STORES}`,
        payload.userID,
        documentData

    ).then((response) => {
        return response
    }).catch((err) => {

        return err
    })

    return res
}
