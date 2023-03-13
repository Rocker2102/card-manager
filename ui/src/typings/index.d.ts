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
