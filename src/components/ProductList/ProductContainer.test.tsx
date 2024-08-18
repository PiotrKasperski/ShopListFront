import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import ProductContainer from "./ProductContainer";
import ProductModel from "../../models/ProductModel";

describe("ProductContainer", () => {
  const mockProduct: ProductModel = {
    itemID: 1,
    productName: "Test Product",
    count: 5,
    isChecked: false,
  };

  const mockOnDelete = vi.fn();
  const mockOnChange = vi.fn();

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
    fireEvent.input(nameInput, { target: { value: "Updated Product" } });
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        ...mockProduct,
        productName: "Updated Product",
      });
    });
  });

  it("calls onChange with updated product when the count is changed", async () => {
    render(
      <ProductContainer
        product={mockProduct}
        onDelete={mockOnDelete}
        onChange={mockOnChange}
      />,
    );

    const countInput = screen.getByTestId("product-count-input");
    fireEvent.input(countInput, { target: { value: "10" } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        ...mockProduct,
        count: 10,
      });
    });
  });

  it("calls onChange with updated product when the checkbox is clicked", async () => {
    render(
      <ProductContainer
        product={mockProduct}
        onDelete={mockOnDelete}
        onChange={mockOnChange}
      />,
    );

    const checkbox = screen.getByTestId("product-checkbox");
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        ...mockProduct,
        isChecked: true,
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
