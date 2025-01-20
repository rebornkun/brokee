import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { cloudinaryFormDataParser } from "./cloudinary-form-parser";
import { CloudinaryPresets } from "../enums/cloudinary";

export const imageUploadHandler = (
  e: ChangeEvent<HTMLInputElement>,
  folderId: string,
  setFormData: Dispatch<SetStateAction<FormData | undefined>>,
  setImageUrl: Dispatch<SetStateAction<string>>
) => {
  if (e.target.files && e.target.files.length > 0) {
    // generate form data from image file selected
    const formData = cloudinaryFormDataParser(
      e,
      folderId,
      CloudinaryPresets.DEPOSITS
    );

    // update form data state to be used later in cloudinary
    setFormData(formData);

    // extract local url to display immediately in UI
    const imageFile = formData?.get("file") as Blob;
    const imageUrl = URL.createObjectURL(imageFile);

    // update image url state
    setImageUrl(imageUrl);
  }
};
