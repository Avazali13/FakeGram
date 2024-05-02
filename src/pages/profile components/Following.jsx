
import { useParams } from "react-router-dom";
import useGetFollowingUsers from "../../hooks/useFollowingUser";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

function Following() {

  const { isLoading, followingUsers }=useGetFollowingUsers()
  const {username}=useParams()

  if (isLoading) return <Spinner />;
  if (!followingUsers?.length)
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Heading as="h3" className="text-red-800 mb-4">
          `Sorry ! ☹️ {username} don't follow anyone`
        </Heading>
      </div>
    );

  return (
    <div className=" py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {followingUsers.map((user) => (
          <SuggestedUser user={user} key={user.uid} />
        ))}
      </div>
    </div>
  );
}

export default Following;
