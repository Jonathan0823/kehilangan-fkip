import { Client, Account, Databases } from 'appwrite';

const client = new Client();
export const account = new Account(client);
export const database = new Databases(client);


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);


export default client;