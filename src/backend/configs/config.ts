import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(`${import.meta.env.VITE_BACKEND_ENDPOINT}`)
    .setProject(`${import.meta.env.VITE_BACKEND_PROJECT_ID}`);

export const account = new Account(client);
export const databases = new Databases(client)

export { ID, } from 'appwrite';


