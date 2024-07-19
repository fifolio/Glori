import { databases } from "@/backend/configs/config";

export async function adjustCartItem( itemId: string, itemSize: string, itemQuantity: string) {
 

    const res = await databases.updateDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_CARTS}`,
        `${itemId}`,
        {
            size: Number(itemSize),
            quantity: Number(itemQuantity),
        }

    ).then(() => {
        return true
    }).catch((err) => {
        return err
    })

    return res
}
