import { render, fireEvent } from "@testing-library/react";
import DropzoneAreaExample from "../dropZone/dropZone";

const createMockFile = (name, size, type) => {
  const file = new File([], name, { type });
  Object.defineProperty(file, 'size', {
    get: () => size,
  });
  return file;
};

describe("DropzoneAreaExample", () => {
  it("displays a warning when users attempt to upload the same photo multiple times", async () => {
    const { getByTestId } = render(<DropzoneAreaExample />);
    const file1 = createMockFile("photo1.jpg", 1024, "image/jpeg");
    const duplicateFile1 = createMockFile("photo1.jpg", 1024, "image/jpeg");
    const dropzone = getByTestId("dropzone");
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file1],
      },
    });
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [duplicateFile1],
      },
    });
    const warningText = await screen.findByText(/cannot upload the same photo multiple times/i);
    expect(warningText).toBeInTheDocument();
  });

  it("displays a warning when users attempt to upload files in formats other than jpg/jpeg and png", async () => {
    const { getByTestId } = render(<DropzoneAreaExample />);
    const nonImageFile = createMockFile("invalid-document.txt", 512, "text/plain");
    const dropzone = getByTestId("dropzone");
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [nonImageFile],
      },
    });
    const warningText = await screen.findByText(/only jpg, jpeg, and png files are accepted/i);
    expect(warningText).toBeInTheDocument();
  });
});