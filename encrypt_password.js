const crypto = require('crypto-js');
const fs = require('fs');

require('dotenv').config({ path: './.env.staging' });

const baseURL = process.env.SF_BASE_URL
if(!baseURL) {
    console.error('SF_BASE_URL is not set in .env.staging');
    process.exit(1);
}
const username = process.env.SF_USERNAME;
const password = process.env.SF_PASSWORD;   
if(!username || !password) {
    console.error('SF_USERNAME or SF_PASSWORD is not set in .env.staging');
    process.exit(1);
}   
const encryptionKey = process.env.ENCRYPTION_KEY;
if(!encryptionKey) {    
    console.error('ENCRYPTION_KEY is not set in .env.staging');
    process.exit(1);
}   

//Encrypt the password using AES encryption
const encryptedPassword = crypto.AES.encrypt(password, encryptionKey).toString();
//Write the encrypted password back in a file
fs.writeFile("encrypted_password.txt", encryptedPassword, (err) => {
    if (err) {
        console.error('Error writing encrypted password to file:', err);
        process.exit(1);
    }
    console.log('Encrypted password written to encrypted_password.txt');
});