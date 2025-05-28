import CryptoJS from "crypto-js";

export const SECRET_KEY = "SECRET_KEY_PASSWORD";

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptPassword = (encryptedPassword) => {
  if (!encryptedPassword) {
    return null;
  }

  try {
    const encryptedStr = encryptedPassword.toString();
    const bytes = CryptoJS.AES.decrypt(encryptedStr, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      return null;
    }

    return decrypted;
  } catch (error) {
    return null;
  }
};

