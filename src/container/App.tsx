import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AppRouter from "./AppRouter";
import { queryClient } from "../utils/react-query";
import { Toaster } from "sonner";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdInfo } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import { ImSpinner } from "react-icons/im";

function App() {
  return (
    <div className="App w-full h-full">
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <Toaster
          duration={3000}
          position="bottom-left"
          closeButton
          icons={{
            success: <FaRegCircleCheck className="text-[25px] text-green" />,
            info: <MdInfo className="text-[25px] text-blue" />,
            warning: (
              <IoWarningOutline className="text-[25px] text-darkYellow" />
            ),
            error: <GiCancel className="text-[25px] text-red" />,
            loading: <ImSpinner className="text-[25px] text-black" />,
          }}
          toastOptions={{
            classNames: {
              icon: "w-[25px]",
            },
            className: "sonner h-[100px]",
          }}
        />
      </QueryClientProvider>
    </div>
  );
}
export default App;
