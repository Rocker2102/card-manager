const ALGORITHM = "AES-CBC";
const RAW_VECTOR = "f14dfe53d3814c89";
const INIT_VECTOR = new Uint8Array(new TextEncoder().encode(RAW_VECTOR));

export const generateKey = async (password: string) => {
  const digest = await crypto.subtle.digest("SHA-256", encode(password));

  return await crypto.subtle.importKey("raw", digest, ALGORITHM, false, ["encrypt", "decrypt"]);
};

export const encode = (data: string) => {
  return new TextEncoder().encode(data);
};

export const decode = (data: ArrayBuffer) => {
  return new TextDecoder().decode(data);
};

export const encrypt = async (data: Uint8Array, key: CryptoKey) => {
  return await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv: INIT_VECTOR
    },
    key,
    data
  );
};

export const decrypt = async (data: ArrayBuffer, key: CryptoKey) => {
  return await crypto.subtle.decrypt(
    {
      name: ALGORITHM,
      iv: INIT_VECTOR
    },
    key,
    data
  );
};
