import {test as setup} from '@playwright/test';
require('dotenv').config({ path: './.env.staging' });
const environment = process.env.SF_ENV || 'staging';
const baseUrl = process.env.SF_BASE_URL
const userName = process.env.SF_USERNAME;
const authFile = 'playwright/.auth/user.json';
const encryptionKey = process.env.ENCRYPTION_KEY


const fs = require('fs');
const crypto = require('crypto-js');
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import {LoginPage} from '../pages/login_page.js';
const encryptedPassword = process.env.SF_ENCRYPTED_PASSWORD;

const getDecryptedPassword = () => {
  return new Promise((resolve, reject) => {
    if (!encryptedPassword) {
      fs.readFile('encrypted_password.txt', 'utf8', (err, encryptedPassword) => {
      if (err) {
        reject('Error reading the encrypted password file: ' + err);
        return;
      }
      if (encryptedPassword === '') {
        throw new Error('Encrypted password is empty!')
      }
      
      const bytes = AES.decrypt(encryptedPassword, encryptionKey);
      const decryptedPassword = bytes.toString(Utf8);
    
      resolve(decryptedPassword);
    });
    }
    
  });
};

setup("login to Salesforce", async ({page}) => {
  
  
  const loginPage = new LoginPage(page);
  
  const password = await getDecryptedPassword(); 
  console.log(`Running session authentication for:
        Environment (SF_ENV): ${environment}
        Base url (SF_BASE_URL): ${baseUrl}
        Username (SF_USERNAME): ${userName}`)
  
   await page.goto(process.env.SF_BASE_URL);

   await loginPage.login(userName, password);
  
   await page.context().storageState({ path: authFile });
   console.log('Session authentication stored')
});