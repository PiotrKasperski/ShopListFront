import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import PrivateRoute from "./PrivateRoute";

// Mocked component to test rendering
const MockComponent = () => <div>Private Content</div>;

describe("PrivateRoute", () => {
  it("renders children when token is present", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/private">
            <PrivateRoute token="valid_token">
              <MockComponent />
            </PrivateRoute>
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    // Verify that the content is rendered
    expect(screen.getByText("Private Content")).toBeInTheDocument();
  });

  it("redirects to /users when token is absent", async () => {
    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute token="">
                <MockComponent />
              </PrivateRoute>
            }
          />
          <Route path="/users" element={<div>Users Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for redirect to occur
    await waitFor(() => {
      expect(screen.getByText("Users Page")).toBeInTheDocument();
    });
  });

  it("redirects to /users when token is 'null'", async () => {
    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute token="null">
                <MockComponent />
              </PrivateRoute>
            }
          />
          <Route path="/users" element={<div>Users Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    // Wait for redirect to occur
    await waitFor(() => {
      expect(screen.getByText("Users Page")).toBeInTheDocument();
    });
  });
});
