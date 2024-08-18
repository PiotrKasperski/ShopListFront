import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import { vi, describe, it, expect } from "vitest";
import useAuth from "../../hooks/useAuth";

// Mockowanie `useAuth` hooka
vi.mock("../../hooks/useAuth", () => ({
  default: () => ({
    login: vi.fn(() => Promise.resolve("mocked_token")),
  }),
}));

describe("LoginComponent", () => {
  const mockSetToken = vi.fn();
  const mockHistoryPush = vi.fn();

  beforeEach(() => {
    // Mockowanie `useHistory`
    vi.spyOn(require("react-router"), "useHistory").mockReturnValue({
      push: mockHistoryPush,
    });
  });

  it("renders input fields and login button", () => {
    render(<LoginComponent setToken={mockSetToken} />, {
      wrapper: MemoryRouter,
    });

    // Sprawdzenie, czy pola i przycisk są wyświetlane
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText(/Zaloguj/i)).toBeInTheDocument();
  });

  it("updates credentials state on input change", () => {
    render(<LoginComponent setToken={mockSetToken} />, {
      wrapper: MemoryRouter,
    });

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId(/Password/i);
    // Symulowanie wpisywania tekstu do pól
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    // Sprawdzenie, czy stan został zaktualizowany
    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("password");
  });

  it("calls setToken after successful login", async () => {
    render(<LoginComponent setToken={mockSetToken} />, {
      wrapper: MemoryRouter,
    });

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId(/Password/i);
    const loginButton = screen.getByText(/Zaloguj/i);

    // Symulowanie wpisywania tekstu i kliknięcia przycisku logowania
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);

    // Sprawdzenie, czy login został wywołany i czy token został ustawiony
    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith("mocked_token");
    });
  });

  it("throws error if setToken is not a function", () => {
    // Spodziewany błąd, jeśli `setToken` nie jest funkcją
    expect(() =>
      render(<LoginComponent setToken={null as any} />, {
        wrapper: MemoryRouter,
      }),
    ).toThrow("setToken must be a function");
  });
});
