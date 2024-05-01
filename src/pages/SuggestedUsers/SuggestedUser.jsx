import { Avatar } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import { NavLink } from "react-router-dom";

function SuggestedUser({ user, setUser, yes }) {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authUser],
    });
  };

  return (
    <div className="suggested-user flex items-center justify-between border-b border-gray-300 py-4">
      <div className="flex items-center gap-4">
        <NavLink to={`/${user?.username}`}>
          <Avatar src={user?.profilePicURL} size={"xl"} />
        </NavLink>
        <div>
          <NavLink to={`/${user?.username}`}>
            <p className="font-semibold text-[16px]">{user?.username}</p>
          </NavLink>
          <p className="text-gray-500 text-[13px]">
            {user?.followers.length} followers
          </p>
        </div>
      </div>
      {user.uid !== authUser.uid && (
        <button
          disabled={isUpdating}
          onClick={onFollowUser}
          className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none ${
            isFollowing ? "bg-red-500" : ""
          }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
}

export default SuggestedUser;
