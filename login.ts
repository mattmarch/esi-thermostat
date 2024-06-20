import * as crypto from "crypto";
import config from "./config";

const encoding = "utf-8";
const iv = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);

const encryptDES = (data: string, key: string): string => {
  const cipher = crypto.createCipheriv(
    "des-cbc",
    Buffer.from(key, encoding),
    iv
  );
  let encrypted = cipher.update(data, encoding, "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

export type User = {
  id: string;
  token: string;
  name: string;
};

export const login = async (email: string, password: string): Promise<User> => {
  const payload = {
    email,
    password: encryptDES(password, config.passwordEncryptKey),
    password_encryption: "password_encryption",
  };

  const response = await fetch(`${process.env.BASE_URL}/login`, {
    method: "POST",
    body: new URLSearchParams(payload),
  });
  const responseJson = await response.json();
  return {
    id: responseJson.user.id,
    token: responseJson.user.token,
    name: responseJson.user.username,
  };
};
