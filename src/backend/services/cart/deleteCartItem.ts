import { databases } from "@/backend/configs/config";


export async function deleteCartItem(itemId: string) {

  const res = await databases.deleteDocument(
    `${import.meta.env.VITE_DATABASES_MAIN}`,
    `${import.meta.env.VITE_COL_CARTS}`,
    `${itemId}`,
 
  ).then(() => {
    return true
  }).catch((err) => {
    return err
  })

  return res
}
