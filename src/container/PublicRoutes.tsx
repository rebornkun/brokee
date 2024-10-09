import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutesUrl } from "./Routes";

const Home = React.lazy(() => import("../../src/pages/Landing/Home/Home"));
const About = React.lazy(() => import("../../src/pages/Landing/About/About"));
const Services = React.lazy(
  () => import("../../src/pages/Landing/Services/Services")
);
const Pricing = React.lazy(
  () => import("../../src/pages/Landing/Pricing/Pricing")
);
const Contact = React.lazy(
  () => import("../../src/pages/Landing/Contact/Contact")
);
const Faq = React.lazy(() => import("../../src/pages/Landing/Faq/Faq"));
const Footer = React.lazy(() => import("../components/Footer/Footer"));

const WebRouter = () => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
        <Footer />
      </Suspense>
    </>
  );
};

export const PublicRoutes = [
  {
    path: PublicRoutesUrl.HOME,
    element: <WebRouter />,
    children: [
      {
        path: PublicRoutesUrl.HOME,
        name: "Home",
        element: <Home />,
      },
      {
        path: PublicRoutesUrl.ABOUT,
        name: "About",
        element: <About />,
      },
      {
        path: PublicRoutesUrl.SERVICES,
        name: "Services",
        element: <Services />,
      },
      {
        path: PublicRoutesUrl.PRICING,
        name: "Pricing",
        element: <Pricing />,
      },
      {
        path: PublicRoutesUrl.CONTACT,
        name: "Contact",
        element: <Contact />,
      },
      {
        path: PublicRoutesUrl.FAQ,
        name: "Faq",
        element: <Faq />,
      },
      {
        path: "*",
        name: "Invalid",
        element: <Navigate to="/" replace={true} />,
      },
    ],
  },
];
