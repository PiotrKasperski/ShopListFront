import { render, screen, fireEvent } from "@testing-library/react";
import AddShopListFab from "./AddShopListFab";
import { describe, it, expect, vi } from "vitest";
import { IonInput } from "@ionic/react";

// Przykład custom-render, jeśli korzystasz z Shadow DOM w Ionic
const customRender = (ui, options) =>
  render(ui, {
    ...options,
    container: document.body.appendChild(document.createElement("div")),
  });

describe("AddShopListFab", () => {
  it(
    "opens and closes modal correctly",
    async () => {
      customRender(<AddShopListFab onAddListClick={() => { }} />);

      const openModalBtn = screen.getByTestId("open-modal-btn");
      fireEvent.click(openModalBtn);

      // Upewnij się, że modal się otworzył
      const input = await screen.findByPlaceholderText("Wprowadź nazwę");
      expect(input).toBeInTheDocument();

      // Zamknięcie modalu
      const addListBtn = screen.getByTestId("add-list-btn");
      fireEvent.click(addListBtn);
      expect(
        screen.queryByPlaceholderText("Nazwa nowej listy"),
      ).not.toBeInTheDocument();
    },
    {},
  );

  it(
    "calls onAddListClick with the correct list name",
    async () => {
      const mockOnAddListClick = vi.fn();
      customRender(<AddShopListFab onAddListClick={mockOnAddListClick} />);

      fireEvent.click(screen.getByTestId("open-modal-btn"));

      const input = await screen.findByPlaceholderText("Wprowadź nazwę");
      fireEvent.change(input, {
        target: { value: "My Shopping List" },
      });

      fireEvent.click(screen.getByTestId("add-list-btn"));
      expect(mockOnAddListClick).toHaveBeenCalledWith("My Shopping List");
    },
    {},
  );

  it(
    "does not call onAddListClick when input is empty",
    async () => {
      const mockOnAddListClick = vi.fn();
      customRender(<AddShopListFab onAddListClick={mockOnAddListClick} />);

      fireEvent.click(screen.getByTestId("open-modal-btn"));
      const input = await screen.findByPlaceholderText("Wprowadź nazwę");
      fireEvent.change(input, {
        target: { value: "" },
      });

      fireEvent.click(screen.getByTestId("add-list-btn"));
      expect(mockOnAddListClick).not.toHaveBeenCalled();
    },
    {},
  );
});
