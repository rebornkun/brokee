import { ChangeEventHandler } from "react";
import { useAppStore } from "../../store/store";
import { LuLoader2 } from "react-icons/lu";
import { EditSvg } from "../../assets/svg/svg";

const ProfileImage = ({
  forProfilePage,
  handleChange,
  photoIsLoading,
  imagePreviewUrl,
  isForDistributor,
}: {
  forProfilePage?: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  photoIsLoading?: boolean;
  imagePreviewUrl: string;
  isForDistributor?: boolean;
}) => {
  const userData = useAppStore((state) => state.userData);
  return (
    <div className="w-fit h-fit relative">
      <div
        className={` ${
          forProfilePage ? "h-[152px] w-[152px]" : "h-[141px] w-[141px]"
        } rounded-full overflow-hidden relative`}
      >
        {isForDistributor ? (
          <img
            src={userData.avatar || "/profileEazi.jpeg"}
            className="w-full h-full z-[1]"
          />
        ) : (
          <img
            src={imagePreviewUrl || "/profileEazi.jpeg"}
            className="w-full h-full z-[1]"
          />
        )}
        {photoIsLoading && (
          <div className="absolute top-0 left-0 bg-black opacity-[0.1] w-full h-full z-[2] rounded-full flex items-center justify-center">
            <LuLoader2 className=" animate-spin text-white text-[80px]" />
          </div>
        )}
      </div>
      <label
        htmlFor="upload-photo"
        className={`!block absolute h-[25px] w-[25px]  ${
          forProfilePage
            ? "right-[6px] bottom-[12px]"
            : "right-[-8px] bottom-[10px]"
        } z-[5]`}
      >
        <div
          className={`flex items-center justify-center bg-darkGreen rounded-full w-[25px] h-[25px] cursor-pointer  `}
        >
          <EditSvg className="h-[17px] w-[17px] " forProfile={true} />
        </div>
      </label>
      <input
        accept="image/jpeg, image/jpg, image/png"
        type="file"
        name="photo"
        id="upload-photo"
        className="absolute bg-transparent invisible cursor-pointer"
        onChange={handleChange}
      />
    </div>
  );
};

export default ProfileImage;
