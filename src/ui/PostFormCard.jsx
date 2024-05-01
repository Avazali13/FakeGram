/* eslint-disable no-template-curly-in-string */
import Card from "./Card";
import { FaRegUser } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import { FaRegSmile } from "react-icons/fa";
import Avatar from "./Avatar";
import useAuthStore from "../store/authStore";

function PostFormCard() {
  const authUser=useAuthStore(state=>state.user)
  const placeholder = `What's on your mind ${authUser.username}`
  return (
    <Card>
      <div className="flex gap-3 ">
        <div>
        <Avatar src={authUser.profilePicURL}/>
        </div>
        <textarea className="grow p-4 h-14" placeholder={placeholder} />
      </div>
      <div className="flex gap-5 mt-2 items-center ">
        <div>
          <button className="flex items-center gap-2"><FaRegUser/><span className="hidden md:block">People</span></button>{" "}
        </div>
        <div>
          <button className="flex items-center gap-2"><LuMapPin/><span className="hidden md:block">Check in</span></button>{" "}
        </div>
        <div>
          <button className="flex items-center gap-2"> <FaRegSmile/><span className="hidden md:block">Mood</span></button>{" "}
        </div>
        <div className="grow text-right">
          <button className=" bg-blue-500 text-white px-6 py-1 rounded-md ">Share</button>
        </div>
      </div>
    </Card>
  );
}

export default PostFormCard;
