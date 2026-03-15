import { useEffect, useState } from "react";
import { fetchHelloMessage } from "./api";

export function App() {
  const [message, setMessage] = useState("Loading...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessage = async () => {
      try {
        const nextMessage = await fetchHelloMessage();
        setMessage(nextMessage);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Unknown error");
      }
    };

    void loadMessage();
  }, []);

  return (
    <main>
      <h1>Fullstack Template</h1>
      {error ? <p role="alert">Error: {error}</p> : <p>{message}</p>}
    </main>
  );
}
