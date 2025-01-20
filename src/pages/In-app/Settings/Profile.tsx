import ProfilePageAccountDetails from "../../../components/Profile/ProfilePageAccountDetails";
import ProfilePageChangeEmail from "../../../components/Profile/ProfilePageChangeEmail";
import ProfilePageChangePassword from "../../../components/Profile/ProfilePageChangePassword";
import ProfilePageDeleteAccount from "../../../components/Profile/ProfilePageDeleteAccount";
import ProfilePageImageSection from "../../../components/Profile/ProfilePageImageSection";

const Profile = () => {
  return (
    <div className="mt-[32px] max-sm:mt-[11px] flex max-md:flex-col gap-[28px] w-full mb-[100px]">
      <ProfilePageImageSection />
      <div className="flex flex-col gap-[28px] w-full">
        <ProfilePageAccountDetails />
        {/* <ProfilePageChangeEmail /> */}
        <ProfilePageChangePassword />
        <ProfilePageDeleteAccount />
      </div>
    </div>
  );
};

export default Profile;
