import {
  DefaultResponse,
  RequestMessage,
} from "../../types/default-response.dto";

export const cloudinaryUpload = async (formData: FormData | undefined) => {
  const response = await fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_API!, {
    method: "POST",
    body: formData,
  });
  return response;
};

export const CreateDefaultResponse = (
  type: RequestMessage,
  message: string,
  payload: any
): DefaultResponse => {
  return {
    data: {
      alert: {
        type: type,
        message: message,
      },
      payload: payload,
    },
  };
};
