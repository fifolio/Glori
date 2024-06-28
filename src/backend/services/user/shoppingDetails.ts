import { databases } from "@/backend/configs/config";

type shipmentDataTypes = {
  userID: string,
  streetAddress: string,
  city: string,
  state: string,
  zipCode: string,
}

type creditCardDataTypes = {
  userID: string,
  cardNumber: string,
  expiryMonth: string,
  expiryYear: string,
  cvc: string,
}


// Handle Shipment Information
export async function handleShipmentInformation(data: shipmentDataTypes) {

  let documentData = {
    streetAddress: data.streetAddress,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
  };

  // Check if the Logged-in user has already Shopping Details Document:
  // This check is essential to route the user request to the right function (create or update)-Document

  await databases.getDocument(
    `${import.meta.env.VITE_DATABASES_MAIN}`,
    `${import.meta.env.VITE_COL_USERS}`,
    data.userID,
  ).then(async () => {

    await databases.updateDocument(
      `${import.meta.env.VITE_DATABASES_MAIN}`,
      `${import.meta.env.VITE_COL_USERS}`,
      data.userID,
      documentData

    ).then((res) => {
      console.log(res)
      return true
    }).catch((err) => {
      console.log('Error catched: >> ', err)
      return false
    })

  }).catch(async () => {

    await databases.createDocument(
      `${import.meta.env.VITE_DATABASES_MAIN}`,
      `${import.meta.env.VITE_COL_USERS}`,
      data.userID,
      documentData

    ).then((res) => {
      console.log(res)
      return true
    }).catch((err) => {
      console.log('Error catched: >> ', err)
      return false
    })
  })

}

// Handle Credit Cart Information
export async function handleCreditCardInformation(data: creditCardDataTypes) {




  let documentData = {
    cardNumber: data.cardNumber,
    expiryMonth: data.expiryMonth,
    expiryYear: data.expiryYear,
    cvc: data.cvc,
  };

  // Check if the Logged-in user has already Shopping Details Document:
  // This check is essential to route the user request to the right function (create or update)-Document
  await databases.getDocument(
    `${import.meta.env.VITE_DATABASES_MAIN}`,
    `${import.meta.env.VITE_COL_USERS}`,
    data.userID,
  ).then(async () => {

    await databases.updateDocument(
      `${import.meta.env.VITE_DATABASES_MAIN}`,
      `${import.meta.env.VITE_COL_USERS}`,
      data.userID,
      documentData

    ).then((res) => {
      console.log(res)
      return true
    }).catch((err) => {
      console.log(err)
      return false
    })

  }).catch(async () => {

    await databases.createDocument(
      `${import.meta.env.VITE_DATABASES_MAIN}`,
      `${import.meta.env.VITE_COL_USERS}`,
      data.userID,
      documentData

    ).then((res) => {
      console.log(res)
      return true
    }).catch((err) => {
      console.log(err)
      return false
    })

  })


}

// Get the Logged-in user Shopping Details
export async function getShoppingDetails(loggedinUserId: string) {
 const results = await databases.getDocument(
    `${import.meta.env.VITE_DATABASES_MAIN}`,
    `${import.meta.env.VITE_COL_USERS}`,
    `${loggedinUserId}`, // documentId
    [] // queries (optional)
  ).then((res) => {
    return res
  }).catch(() => {
    return false
  })

  return results

}