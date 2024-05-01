import { Avatar } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function FriendInfo({ anyOne }) {
  return (
    <div className="flex gap-2 border-b p-6 border-b-gray-100">
      <NavLink to={`/${anyOne?.username}`} className='flex items-center gap-4'>
        <Avatar src={anyOne?.profilePicURL} />
        <div>
          <h3 className="font-bold text-xl">{anyOne?.username}</h3>
        </div>
      </NavLink>
    </div>
  );
}

export default FriendInfo;
