import { ChangeEvent, useState } from "react";
import {
  CloudinaryPresets,
  CloudinarySubfolders,
} from "../../enums/cloudinary";
import { useAppStore } from "../../store/store";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationKeys, QueryKeys } from "../../enums/react-query";
import ProfileImage from "../Elements/ProfileImage";

const ProfilePageImageSection = () => {
  const userData = useAppStore((state) => state.userData);
  const queryClient = useQueryClient();

  // const { mutate: updateDistributorAvatarMutate, isPending } = useMutation({
  //   mutationKey: [MutationKeys.UPDATEDISTRIBUTORAVATAR],
  //   mutationFn: (value: string) => updateDistributor({ avatar: value }),
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({
  //       queryKey: [`${QueryKeys.GETDISTRIBUTOR}`],
  //     });
  //   },
  //   onError: (error) => {
  //     // console.log(error);
  //   },
  // });

  // const { mutateAsync: uploadAvatar, isPending: isUploadPending } = useMutation(
  //   {
  //     mutationKey: [MutationKeys.DISTRIBUTORAVATARUPLOAD],
  //     mutationFn: async (formData: FormData) => {
  //       const response = await cloudinaryUpload(formData);
  //       const data = await response.json();
  //       updateDistributorAvatarMutate(data.secure_url);
  //       return data.secure_url;
  //     },
  //   }
  // );

  // const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log("sdsd");
  //   let formData = null;
  //   if (e.target.files && e.target.files.length > 0) {
  //     // generate form data from image file selected
  //     formData = cloudinaryFormDataParser(
  //       e,
  //       CloudinarySubfolders.DISTRIBUTORS,
  //       CloudinaryPresets.DISTRIBUTOR_AVATARS
  //     );
  //   }

  //   if (formData) {
  //     uploadAvatar(formData);
  //   }
  // };

  return (
    <div className="h-fit px-[58px] py-[43px] border-[1px] border-[#E5E7EB] rounded-[8px] flex flex-col items-center gap-[22px] ">
      <h5 className="text-[18px] 2xl:text-[20px] text-black font-[400] ">
        Profile Picture
      </h5>
      <div className="flex flex-col items-center gap-[12px] w-fit">
        <ProfileImage
          forProfilePage={true}
          // handleChange={uploadImage}
          // photoIsLoading={isUploadPending || isPending}
          handleChange={() => {}}
          photoIsLoading={false}
          imagePreviewUrl={""}
          isForDistributor={true}
        />
        <div className="w-full h-[1px] bg-[#E6EAEE] "></div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-[14px] 2xl:text-[16px] font-[400] text-[#344054] ">
            {userData?.fullName || "XXXXX XXXXX"}
          </p>
          <p className="text-[12px] 2xl:text-[14px] font-[300] text-[#475467] ">
            {userData?.email || "XXXXXXXXX@XXXXX.XXX"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageImageSection;
