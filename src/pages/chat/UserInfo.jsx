import { Avatar } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";

const UserInfo = () => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <div className="flex gap-5 items-center p-4 border-b-2">
      <Avatar size={"xl"} src={authUser.profilePicURL} />
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">{authUser?.username}</h2>
        <p className="text-md text-gray-500">{authUser?.bio || "No bio yet"}</p>
      </div>
    </div>
  );
};

export default UserInfo;

