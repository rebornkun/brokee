import { useEffect, useRef } from "react";
import { useAppStore } from "../../../store/store";
import DeleteModal from "./DeleteModal";
import AddUsdcAccountModal from "./AddUsdcAccountModal";

const Modal = () => {
  const modalIsOpen = useAppStore((state) => state.modalIsOpen);
  const setModalIsOpen = useAppStore((state) => state.setModalIsOpen);
  const modalType = useAppStore((state) => state.modalType);
  const setModalType = useAppStore((state) => state.setModalType);

  const modalContentRef = useRef<HTMLDivElement>(null);
  const getModalComponent = () => {
    if (
      modalType === "deleteUser" ||
      modalType === "deleteFiatAccount" ||
      modalType === "deleteUsdcAccount"
    ) {
      return <DeleteModal />;
    } else if (modalType === "addUsdcAccount") {
      return <AddUsdcAccountModal />;
    }
  };

  useEffect(() => {
    if (modalIsOpen) {
    } else {
      setTimeout(() => {
        setModalType("none");
      }, 300);
    }
  }, [modalIsOpen]);

  return (
    <div
      className={`modal ${
        modalIsOpen ? "open" : "close"
      } w-full h-full fixed top-0 left-0 bottom-0 right-0 m-auto z-[1001]`}
    >
      <div
        className={`w-full h-full modal-back ${
          modalIsOpen ? "open" : "close"
        } `}
        onClick={() => {
          setModalIsOpen(false);
        }}
      ></div>
      <div
        ref={modalContentRef}
        className={`modal-container ${
          modalIsOpen ? "open" : "close"
        } w-fit absolute right-0 top-0 left-0 bottom-0 m-auto h-fit flex items-center justify-center`}
      >
        {getModalComponent()}
      </div>
    </div>
  );
};

export default Modal;
