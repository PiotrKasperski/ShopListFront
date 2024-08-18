import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ShopListContainer from "./ShopListContainer";
import ShopListModel from "../../models/ShopListsModel";
import useProtectedApi from "../../hooks/useProtectedApi";
import api from "../../Services/api";
import { vi } from "vitest";

vi.mock("../../hooks/useProtectedApi", () => ({
  __esModule: true,
  default: () => ({
    get: vi.fn(() => Promise.resolve({ data: [] })), // Mocking the `get` function
    remove: vi.fn(() => Promise.resolve({ data: "deleted" })),
  }),
}));

const mockOnDelete = vi.fn();

describe("ShopListContainer", () => {
  const shopList = {
    shopListID: "1",
    name: "Test Shop List",
  } as ShopListModel;

  it("renders correctly", () => {
    render(<ShopListContainer shopList={shopList} onDelete={mockOnDelete} />);
    expect(screen.getByText("Test Shop List")).toBeInTheDocument();
  });

  it("does not call onDelete if popover is not opened", async () => {
    render(<ShopListContainer shopList={shopList} onDelete={mockOnDelete} />);

    const deleteButton = screen.queryByTestId("delete-button");
    expect(deleteButton).toBeNull();

    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
