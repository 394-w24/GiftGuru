import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./homePage";

describe("HomePage", () => {
  it("User at Home Page click generate recommendation button without any image input will trigger the modal warning", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const recommendationButton = screen.getByRole("button", {
      name: /get recommendations/i,
    });
    expect(recommendationButton).not.toBeNull();
    fireEvent.click(recommendationButton);
    const warning = await screen.findByText(/warning/i);
    expect(warning).not.toBeNull();
  });

  it("But if there are additional information inputed, then it should not be any warning", async () => {
    render(
      <BrowserRouter >
        <HomePage />
      </BrowserRouter>
    );
    const textarea = screen.getByPlaceholderText("Enter Detail Information");
    expect(textarea).toBeDefined();
    fireEvent.change(textarea, { target: { value: "Coca Cola" } });
    expect(textarea.value).toBe("Coca Cola");
    const recommendationButton = screen.getByRole("button", {
      name: /get recommendations/i,
    });
    expect(recommendationButton).not.toBeNull();
    fireEvent.click(recommendationButton);
    const warningText = screen.queryByText(
      /Please upload at least one image to get recommendations./i
    );
    expect(warningText).toBeNull();
  });
});
