import { ChangeEvent } from "react";

export const cloudinaryFormDataParser = (
  e: ChangeEvent<HTMLInputElement>,
  folderId: string,
  preset: string
): FormData | undefined => {
  if (e.target.files) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", new Date().toDateString());
    // formData.append("asset_folder", `Eazipower/${folderId}`);
    formData.append("upload_preset", `${preset}`);
    formData.append(
      "api_key",
      `${process.env.REACT_APP_CLOUDINARY_UPLOAD_API_KEY}`
    );
    return formData;
  }
};