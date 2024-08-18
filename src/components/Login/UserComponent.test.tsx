import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import UserComponent from "./UserComponent";
import LoginComponent from "./LoginComponent";
import RegistrationComponent from "./RegistrationComponent";

describe("UserComponent", () => {
  const mockOnToken = vi.fn();

  it("renders tabs and navigation", () => {
    render(
      <MemoryRouter initialEntries={["/users"]}>
        <UserComponent onToken={mockOnToken} />
      </MemoryRouter>,
    );

    // Check if tabs are rendered
    expect(screen.getByText("Logowanie")).toBeInTheDocument();
    expect(screen.getByText("Rejestracja")).toBeInTheDocument();
  });

  it("redirects to /users/login by default", async () => {
    render(
      <MemoryRouter initialEntries={["/users"]}>
        <UserComponent onToken={mockOnToken} />
      </MemoryRouter>,
    );

    // Wait for redirect to happen
    await waitFor(() => {
      expect(screen.getByText("Logowanie")).toBeInTheDocument();
    });
  });

  it("navigates to /users/registration when 'Rejestracja' tab is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/users/login"]}>
        <UserComponent onToken={mockOnToken} />
      </MemoryRouter>,
    );

    // Click the 'Rejestracja' tab
    fireEvent.click(screen.getByText("Rejestracja"));

    // Wait for the registration component to be visible
    await waitFor(() => {
      expect(screen.getByText("Rejestracja")).toBeInTheDocument();
    });
  });

  it("renders LoginComponent when navigating to /users/login", async () => {
    render(
      <MemoryRouter initialEntries={["/users/login"]}>
        <UserComponent onToken={mockOnToken} />
      </MemoryRouter>,
    );

    // Wait for LoginComponent to be rendered
    await waitFor(() => {
      expect(screen.getByText("Logowanie")).toBeInTheDocument();
    });
  });

  it("renders RegistrationComponent when navigating to /users/registration", async () => {
    render(
      <MemoryRouter initialEntries={["/users/registration"]}>
        <UserComponent onToken={mockOnToken} />
      </MemoryRouter>,
    );

    // Wait for RegistrationComponent to be rendered
    await waitFor(() => {
      expect(screen.getByText("Rejestracja")).toBeInTheDocument();
    });
  });
});
