import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";


export async function deleteProduct(productId: string, productTitle: string) {

  const res = await databases.deleteDocument(
    `${import.meta.env.VITE_DATABASES_MAIN}`,
    `${import.meta.env.VITE_COL_PRODUCTS}`,
    `${productId}`
  ).then(async () => {

    // Delete all the related document from the Cart Collection
    const relatedDocumentsOnCart = await databases.listDocuments(
      `${import.meta.env.VITE_DATABASES_MAIN}`,
      `${import.meta.env.VITE_COL_CARTS}`,
      [
        Query.equal('productTitle', `${productTitle}`)
      ]
    )

    if(relatedDocumentsOnCart.total > 0){
      for(const document of relatedDocumentsOnCart.documents){
        await databases.deleteDocument(
          `${import.meta.env.VITE_DATABASES_MAIN}`,
          `${import.meta.env.VITE_COL_CARTS}`,
          document.$id
        )
      }
    }


    return true
  }).catch((err) => {
    return err
  })

  return res
}
