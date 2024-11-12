import { Resend } from "resend";
import { CreateDefaultResponse } from "../app/app.service";
import { RequestMessage } from "../../types/default-response.dto";
import { ReactElement, ReactNode } from "react";
import WelcomeEmail from "../../components/email/welcome";

const key = import.meta.env.VITE_APP_RESEND_API_KEY;
const resend = new Resend(key);
type TTemplateType = "welcome" | "deposit";

export async function sendEmail(
  toEmail: string,
  subject: string,
  templateType: TTemplateType,
  fullName: string
) {
  try {
    const data = await resend.emails.send({
      from: `Tradex <${import.meta.env.VITE_APP_EMAIL}>`,
      to: toEmail,
      subject: subject,
      react: `${(<WelcomeEmail userFirstname={fullName} />)}`,
      headers: {},
    });
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.resend.com/emails`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Tradex <${import.meta.env.VITE_APP_EMAIL}>`,
          to: toEmail,
          subject: subject,
          react: `${(<WelcomeEmail userFirstname={fullName} />)}`,
        }),
      }
    );
    console.log(response);
    return CreateDefaultResponse(RequestMessage.SUCCESS, "", data);
  } catch (error) {
    if (error instanceof Error) {
      return CreateDefaultResponse(RequestMessage.ERROR, error.message, null);
    } else {
      console.error("Error:", error);
      throw error;
    }
  }
}

const getTemplateType = (templateType: TTemplateType): ReactNode => {
  if (templateType === "welcome") {
    return;
  }
};
