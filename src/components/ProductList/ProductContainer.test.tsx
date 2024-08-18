import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import ProductContainer from "./ProductContainer";
import ProductModel from "../../models/ProductModel";
import { code, key } from "ionicons/icons";

const mockOnDelete = vi.fn();
const mockOnChange = vi.fn();
describe("ProductContainer", () => {
  const mockProduct: ProductModel = {
    itemID: 1,
    productName: "Test Product",
    count: 5,
    isChecked: false,
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with correct data", () => {
    render(
      <ProductContainer
        product={mockProduct}
        onDelete={mockOnDelete}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByTestId("product-name-input")).toHaveValue(
      mockProduct.productName,
    );
    expect(screen.getByTestId("product-count-input")).toHaveValue(
      mockProduct.count,
    );
    expect(screen.getByTestId("product-checkbox")).not.toBeChecked();
  });

  it("calls onChange with updated product when the name is changed", async () => {
    render(
      <ProductContainer
        product={mockProduct}
        onDelete={mockOnDelete}
        onChange={mockOnChange}
      />,
    );

    const nameInput = screen.getByTestId("product-name-input");
    fireEvent.change(nameInput, { target: { value: "Updated Product" } });
    fireEvent.focus(nameInput);
    fireEvent.keyPress(nameInput, { key: "a", code: "KeyA" });
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        ...mockProduct,
        productName: "Updated Product",
      });
    });
  });

  it("calls onDelete when the delete button is clicked", async () => {
    render(
      <ProductContainer
        product={mockProduct}
        onDelete={mockOnDelete}
        onChange={mockOnChange}
      />,
    );

    const deleteButton = screen.getByTestId("delete-btn");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(mockProduct.itemID);
    });
  });
});
