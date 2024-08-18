import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductModel from "../../models/ProductModel";
import ProductListContainer from "./ProductListConteiner";
import { fireEvent, render, screen } from "@testing-library/react";
const mockGet = vi.fn();
const mockPost = vi.fn().mockResolvedValue({});
const mockUpdate = vi.fn();
const mockRemove = vi.fn();
vi.mock("../../hooks/useProtectedApi", () => ({
  default: () => ({
    get: mockGet,
    post: mockPost,
    update: mockUpdate,
    remove: mockRemove,
  }),
}));

describe("ProductListContainer", () => {
  const products: ProductModel[] = [
    { itemID: 1, productName: "Product 1", count: 2, isChecked: false },
    { itemID: 2, productName: "Product 2", count: 1, isChecked: true },
  ];

  beforeEach(() => {
    mockGet.mockResolvedValue({ data: products });
    vi.clearAllMocks();
  });

  it("fetches products when expanded", async () => {
    render(<ProductListContainer shopListID={1} isActive={true} />);

    expect(mockGet).toHaveBeenCalledWith("items/findByShopID/?id=1");
  });

  it("adds a product when add button is clicked", async () => {
    render(<ProductListContainer shopListID={1} isActive={true} />);

    fireEvent.click(screen.getByTestId("add-product-btn"));

    expect(mockPost).toHaveBeenCalledWith("items/", { shopListID: 1 });
  });

  it("toggles the expansion state", () => {
    render(<ProductListContainer shopListID={1} isActive={true} />);

    const toggleBtn = screen.getByTestId("toggle-expand-btn");
    fireEvent.click(toggleBtn);

    expect(mockGet).toHaveBeenCalled();
  });
});
