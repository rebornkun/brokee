// import {
//   Body,
//   Button,
//   Container,
//   Column,
//   Head,
//   Heading,
//   Hr,
//   Html,
//   Img,
//   Link,
//   Preview,
//   Row,
//   Section,
//   Tailwind,
//   Text,
// } from "@react-email/components";
// import * as React from "react";

// // const baseUrl = "https://cointracker.ws";
// const baseUrl = import.meta.env.REACT_APP_BASE_URL || "";

// const paragraph = {
//   fontSize: "16px",
//   lineHeight: "21px",
//   color: "#3c3f44",
// };
// const button = {
//   color: "#fff",
//   padding: "20px 18px",
// };

// export const VercelInviteUserEmail = ({
//   companyEmail = "inquire.cointracker@mail.com",
//   companyAddress = `2093 Philadelphia Pike #2046, Claymont, DE 19703, USA`,
//   txn_id = `U1234355`,
//   inviteLink = `${baseUrl}`,
//   coinType = "BTC",
//   coinAmount = 1.96,
//   walletAddress = "hewffejkfnksjsdjksdjfknJJusN455paPH",
// }) => {
//   const previewText = `you have a new transaction`;
//   const fullInviteLink = `${inviteLink}?txn_id=${txn_id}`;

//   const newMail = "inquire.cointracker@mail.com";

//   return (
//     <Html>
//       <Head />
//       <Preview>{previewText}</Preview>
//       <Tailwind>
//         <Body className="bg-white my-auto mx-auto font-sans">
//           <Section className="mt-[32px]">
//             <Img
//               src={`${baseUrl}/assets/img/blue_tracker.png`}
//               width="160"
//               height="40"
//               alt="Vercel"
//               className="my-0 mx-auto"
//             />
//           </Section>
//           <Container className="border border-solid border-[#eaeaea] rounded my-[20px] mx-auto p-[20px] w-[465px]">
//             <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
//               1 new transaction detected
//             </Heading>
//             <Text className="text-black text-[14px] leading-[24px]">
//               we have detected 1 new transaction in your wallets and
//               exchanges...
//             </Text>
//             <ul>
//               <li>
//                 <Text style={paragraph}>
//                   {" "}
//                   {`Recieved ${coinAmount}${coinType} in ${coinType} Wallet ...${walletAddress.slice(
//                     -12
//                   )}`}
//                 </Text>
//               </li>
//             </ul>
//             <Section className="text-center mt-[32px] mb-[32px]">
//               <Button
//                 style={button}
//                 className="bg-[#0182ff] rounded text-[16px] font-semibold no-underline text-center"
//                 href={fullInviteLink}
//               >
//                 Connect wallets & exchanges
//               </Button>
//             </Section>
//             <Text className="text-black text-[14px] leading-[24px]">
//               <span className="text-[#666666]">For enquiries contact:</span>
//               <br></br>
//               <Link
//                 href={`mailto:${newMail}`}
//                 className="text-blue-600 no-underline"
//               >
//                 {newMail}
//               </Link>{" "}
//               Thanks. <br></br>
//               The CoinTracker Team.
//             </Text>
//           </Container>
//           <div className="mx-auto w-[100px] flex flex-row">
//             <Img
//               src={`${baseUrl}/assets/img/x.png`}
//               width="30"
//               height="30"
//               alt="x"
//               className="my-0 mx-auto cursor-pointer"
//             />
//             <Img
//               src={`${baseUrl}/assets/img/youtube.png`}
//               width="30"
//               height="30"
//               alt="youtube"
//               className="my-0 mx-auto cursor-pointer"
//             />
//           </div>
//           <Text className="text-black text-center text-[14px] leading-[24px] mx-auto">
//             <span className="text-[#666666]">CoinTracker</span>
//             <br></br>
//             <Link
//               href={""}
//               className="text-blue-600 no-underline mx-auto text-[14px] text-center"
//             >
//               {companyAddress}
//             </Link>
//           </Text>
//           <Section></Section>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// };

// export default VercelInviteUserEmail;

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = import.meta.env.VITE_APP_BASE_URL
  ? `https://${import.meta.env.VITE_APP_BASE_URL}`
  : "";

export const WelcomeEmail = ({ userFirstname }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/-logo.png`}
          width="170"
          height="50"
          alt=""
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to , the sales intelligence platform that helps you uncover
          qualified leads and close deals faster.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={baseUrl + "/login"}>
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Tradex team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          470 Noor Ave STE B #1148, South San Francisco, CA 94080
        </Text>
      </Container>
    </Body>
  </Html>
);

WelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
} as WelcomeEmailProps;

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
