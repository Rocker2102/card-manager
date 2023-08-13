type ReadFromStorageOptions<FallbackValueType> = {
  storageType?: "local" | "session";
  key: string;
  parse?: boolean;
  fallbackValue: null | FallbackValueType;
  logError?: boolean;
};

type WriteToStorageOptions = {
  storageType?: "local" | "session";
  key: string;
  value: string;
};

type RemoveFromStorageOptions = {
  storageType?: "local" | "session";
  key: string;
};

export function readFromStorage<ExpectedParsedDataType, FallbackValueType>({
  storageType = "local",
  key,
  parse = false,
  fallbackValue = null,
  logError = false
}: ReadFromStorageOptions<FallbackValueType>): null | ExpectedParsedDataType | FallbackValueType {
  const data = window[`${storageType}Storage`].getItem(key) as
    | null
    | string
    | ExpectedParsedDataType;

  if (!parse) return data as null | ExpectedParsedDataType;
  if (!data) return fallbackValue;

  try {
    return JSON.parse(data as string) ?? fallbackValue;
  } catch {
    if (logError) console.error("Error parsing data from local storage", key);
    return fallbackValue;
  }
}

export function writeToStorage({ storageType = "local", key, value }: WriteToStorageOptions) {
  window[`${storageType}Storage`].setItem(key, value);
}

export function removeFromStorage({ storageType = "local", key }: RemoveFromStorageOptions) {
  window[`${storageType}Storage`].removeItem(key);
}

export function isTouchAvailable() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export function isMobileView() {
  return window.matchMedia("(max-width: 480px)").matches;
}

export function isMobileDevice() {
  return isTouchAvailable() && isMobileView();
}

export async function hash(str: string) {
  const utf8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(bytes => bytes.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
