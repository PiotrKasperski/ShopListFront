import React from "react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { useStorage, useStorageItem } from "@capacitor-community/storage-react";
import { vi, describe, it, beforeEach } from "vitest";

// Mockowanie metod z @capacitor-community/storage-react
vi.mock("@capacitor-community/storage-react", () => ({
  useStorage: vi.fn(),
  useStorageItem: vi.fn(),
}));

vi.mock("@capacitor/status-bar", () => ({
  StatusBar: {
    setStyle: vi.fn(),
    setOverlaysWebView: vi.fn(() => Promise.resolve()),
    hide: vi.fn(),
  },
  StatusBarStyle: {
    Dark: "DARK",
  },
}));

describe("App component", () => {
  beforeEach(() => {
    // Resetowanie domyślnych wartości
    (useStorageItem as vi.Mock).mockReturnValue([null, vi.fn()]);
    (useStorage as vi.Mock).mockReturnValue({
      get: vi.fn(() => Promise.resolve(null)),
    });
  });

  it("renders Shopping Lists header", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Shopping Lists")).toBeInTheDocument();
    });
  });

  it("redirects to /user/login when no token is present", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Logowanie")).toBeInTheDocument();
    });
  });

  it("displays login button when no token is present", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const ionHeader = await waitFor(() => screen.getByRole("banner"));
    const loginButton = within(ionHeader).getByText("Zaloguj");
    expect(loginButton).toBeInTheDocument();
  });

  it("displays logout button when token is present", async () => {
    const mockSetToken = vi.fn();
    (useStorageItem as vi.Mock).mockReturnValue("sdfsdhfs", vi.fn());

    await act(async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
    });

    // Poczekaj, aż załadują się komponenty aplikacji i zniknie stan ładowania
    await waitFor(() => {
      expect(screen.getByText("Wyloguj")).toBeInTheDocument();
    });

    // Teraz sprawdź obecność przycisku "Wyloguj"
  });
});
