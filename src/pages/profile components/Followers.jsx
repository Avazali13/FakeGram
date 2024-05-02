
import { useParams } from "react-router-dom";
import useGetFollowers from "../../hooks/useFollwers";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

function Followers() {

  const { isLoading, followerUsers }=useGetFollowers()
  const {username}=useParams()

  if (isLoading) return <Spinner />;
  if (!followerUsers.length)
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Heading as="h3" className="text-red-800 mb-4">
          Sorry ! ☹️ {username} don't have any followers
        </Heading>
      </div>
    );

  return (
    <div className=" py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {followerUsers.map((user) => (
          <SuggestedUser user={user} key={user.uid} btn={false} />
        ))}
      </div>
    </div>
  );
}

export default Followers;

