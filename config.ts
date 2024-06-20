const assertExists = (value: string | undefined): string => {
  if (value === undefined) {
    throw new Error("Value is undefined");
  }
  return value;
};

const baseUrl = assertExists(process.env.BASE_URL);
const email = assertExists(process.env.EMAIL);
const password = assertExists(process.env.PASSWORD);
const passwordEncryptKey = assertExists(process.env.PASSWORD_ENCRYPT_KEY);

export default {
  baseUrl,
  email,
  password,
  passwordEncryptKey,
};
