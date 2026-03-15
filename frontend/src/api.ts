import { getHello } from "./client";

export async function fetchHelloMessage(): Promise<string> {
  const result = await getHello();

  if (!result || !result.data || typeof result.data.message !== "string") {
    throw new Error("Invalid response from /api/hello");
  }

  return result.data.message;
}
