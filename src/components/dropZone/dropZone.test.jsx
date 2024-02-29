import { render, fireEvent } from "@testing-library/react";
import DropzoneAreaExample from "./DropzoneAreaExample";

const createMockFile = (name, size, type) => {
  const file = new File([], name, { type });
  Object.defineProperty(file, 'size', {
    get: () => size,
  });
  return file;
};

describe("DropzoneAreaExample", () => {
  it("Users cannot upload the same photos repeatedly", async () => {
    const handleImagesChange = jest.fn();
    const { getByTestId } = render(<DropzoneAreaExample handleImagesChange={handleImagesChange} />);

    const file1 = createMockFile("photo1.jpg", 1024, "image/jpeg");
    const file2 = createMockFile("photo2.jpg", 2048, "image/jpeg");
    const duplicateFile1 = createMockFile("photo1.jpg", 1024, "image/jpeg"); 

    const dropzone = getByTestId("dropzone");
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [file1, file2, duplicateFile1],
      },
    });
    expect(handleImagesChange).toHaveBeenCalledWith([file1, file2]); 
  });

  it("The user must upload the image format", async () => {
    const handleImagesChange = jest.fn();
    const { getByTestId } = render(<DropzoneAreaExample handleImagesChange={handleImagesChange} />);
    const imageFile = createMockFile("valid-image.jpg", 1024, "image/jpeg");
    const nonImageFile = createMockFile("invalid-document.txt", 512, "text/plain");
    const dropzone = getByTestId("dropzone"); 
    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [imageFile, nonImageFile],
      },
    });
    expect(handleImagesChange).toHaveBeenCalledWith([imageFile]); 
  });
});
