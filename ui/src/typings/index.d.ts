type FirebaseConfig = {
  appId: string;
  apiKey: string;
  projectId: string;
  authDomain: string;
  measurementId: string;
  storageBucket: string;
  messagingSenderId: string;
  [key: string]: string;
};

type AppSettings = {
  analytics: boolean;
  firebaseAdded: boolean;
  firebaseConfig: null | FirebaseConfig;
};

type ThemeMode = "light" | "dark";

type AuthUser = {
  id: string;
  name: string;
  email?: string;
  photoURL?: string;
  mobileNumber?: string;

  createdAt: Date;
  updatedAt: Date;
};

type CryptoStatus = {
  isDecrypted: boolean;
};

type QueryStatus = {
  LOADING: "LOADING";
  SUCCESS: "SUCCESS";
  ERROR: "ERROR";
};
