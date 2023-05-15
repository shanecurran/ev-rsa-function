const crypto = require('crypto');

exports.handler = async (data, context) => {
  // Retrieve the encrypted input string from the event
  const encryptedString = data.encryptedString;

  const privateKeyString = process.env.PRIVATE_KEY;
  // Retrieve the RSA private key
  const rawDerKey = Buffer.from(privateKeyString, 'base64');
  const privateKey = crypto.createPrivateKey({ key: rawDerKey, format: 'der', type: 'pkcs1' });
  // Decrypt the input string using the RSA private key
  const decryptedBuffer = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(encryptedString, 'base64')
  );
  const decryptedString = decryptedBuffer.toString('utf8');

  const evEncrypted = await context.encrypt(decryptedString)
  console.log("Decrypted value present in logs for testing purposes:" + decryptedString )


  // Return the decrypted string
  return evEncrypted;
};


