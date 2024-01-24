import { useEffect, useState } from "react";
import appDb from "database/app";

export default function useDbReady() {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    appDb.on("ready", () => setReady(true), true);
  }, []);

  return ready;
}
