// Function to read the encrypted password from the text file and decrypt it
const getDecryptedPassword = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('encrypted_password.txt', 'utf8', (err, encryptedPassword) => {
      if (err) {
        reject('Error reading the encrypted password file: ' + err);
        return;
      }
      if (encryptedPassword === '') {
        throw new Error('Encrypted password is empty!')
      }

      const bytes = crypto.AES.decrypt(encryptedPassword, encryptionKey);
      const decryptedPassword = bytes.toString(crypto.enc.Utf8);
      resolve(decryptedPassword);
    });
  });
};