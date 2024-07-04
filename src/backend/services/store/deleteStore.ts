import { databases } from "@/backend/configs/config";
import { Query } from "appwrite";


export async function handleDeleteStore(storeId: string) {

  const res = await databases.deleteDocument(
    `${import.meta.env.VITE_DATABASES_MAIN}`,
    `${import.meta.env.VITE_COL_STORES}`,
    `${storeId}`,

    // If Store Deleted successfully, The following step is to delete all the user products
  ).then(async (res) => {

    // Query documents by userId in the products collection
    const queryResponse = await databases.listDocuments(
      `${import.meta.env.VITE_DATABASES_MAIN}`,
      `${import.meta.env.VITE_COL_PRODUCTS}`,
      [
        Query.equal('userId', `${storeId}`)
      ]
    );

    // Check if any document are found
    if (queryResponse.total > 0) {
      // Iterate over each document and delete it
      for (const document of queryResponse.documents) {
        await databases.deleteDocument(
          `${import.meta.env.VITE_DATABASES_MAIN}`,
          `${import.meta.env.VITE_COL_PRODUCTS}`,
          document.$id
        )
      }
    }

    return res
  }).catch((err) => {
    return err
  })

  return res
}
