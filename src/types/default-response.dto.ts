import { TPagination } from "./types";

export enum RequestMessage {
  SUCCESS = "success",
  ERROR = "error",
}

export interface DefaultResponse {
  data: {
    alert: {
      type: string;
      message: string;
    } | null;
    pagination?: TPagination;
    payload: any | null;
  };
}
