import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegistrationComponent from "./RegistrationComponent";
import { vi } from "vitest";
import useAuth from "../../hooks/useAuth";

vi.mock("../../hooks/useAuth");

describe("RegistrationComponent", () => {
  let mockRegister: vi.Mock;
  let mockOnToken: vi.Mock;
  let mockHistoryPush: vi.Mock;

  beforeEach(() => {
    // Mockowanie `useAuth`
    mockRegister = vi.fn().mockResolvedValue("mocked_token");
    mockOnToken = vi.fn();
    mockHistoryPush = vi.fn();

    (useAuth as vi.Mock).mockReturnValue({
      login: vi.fn(),
      register: mockRegister,
    });

    // Mockowanie `useHistory`
    vi.spyOn(require("react-router"), "useHistory").mockReturnValue({
      push: mockHistoryPush,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders registration form", () => {
    render(<RegistrationComponent onToken={mockOnToken} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByText("Zarejestruj")).toBeInTheDocument();
  });

  it("updates user state on input change", async () => {
    render(<RegistrationComponent onToken={mockOnToken} />, {
      wrapper: MemoryRouter,
    });

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    await waitFor(() => {
      expect(usernameInput).toHaveValue("testuser");
      expect(passwordInput).toHaveValue("password123");
    });
  });

  it("calls register and redirects after successful registration", async () => {
    render(<RegistrationComponent onToken={mockOnToken} />, {
      wrapper: MemoryRouter,
    });

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const registerButton = screen.getByText("Zarejestruj");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled("testuser", "password123");
      expect(mockOnToken).toHaveBeenCalledWith("mocked_token");
    });
  });
});
