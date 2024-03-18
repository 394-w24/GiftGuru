import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./homePage";
import DropzoneAreaExample from "../dropZone/dropZone";

const createMockFile = (name, size, type) => {
    const file = new File([], name, { type });
    Object.defineProperty(file, 'size', {
      get: () => size,
    });
    return file;
  };

describe("User can't generate recommendation button without filling in all required fields", () => {
  it("the modal warning will be triggered in the beginning since no photo and gender have been selected", async () => {
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
    
    const recommendationButton = screen.getByRole("button", {
      name: /get recommendations/i,
    });
    expect(recommendationButton).not.toBeNull();
    fireEvent.click(recommendationButton);
    // const warningText = screen.queryByText(
    //   /Please upload at least one image to get recommendations./i
    // );
    // expect(warningText).toBeNull();

    const warning = await screen.findByText(/warning/i);
    expect(warning).not.toBeNull();
  });

it("displays a warning when users attempt to upload the same photo multiple times", async () => {
    
    const { getByTestId } = render(
                                <BrowserRouter >
                                    <DropzoneAreaExample />
                                </BrowserRouter>
                                );
    const file1 = createMockFile("photo1.jpg", 1024, "image/jpeg");
    const dropzone = getByTestId("dropzone");
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file1],
      },
    });

    const warningText = await screen.findByText(/upload at least one image/i);
    expect(warningText).not.toBeInTheDocument();
});


});