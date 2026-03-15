import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";
import { fetchHelloMessage } from "./api";

vi.mock("./api", () => ({
  fetchHelloMessage: vi.fn(),
}));

describe("App", () => {
  afterEach(() => {
    vi.mocked(fetchHelloMessage).mockReset();
  });

  it("renders hello message from api", async () => {
    vi.mocked(fetchHelloMessage).mockResolvedValue("Hello from FastAPI");

    render(<App />);

    expect(await screen.findByText("Hello from FastAPI")).toBeInTheDocument();
    expect(fetchHelloMessage).toHaveBeenCalledTimes(1);
  });
});
