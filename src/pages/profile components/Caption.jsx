import { Avatar, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import useUserProfileStore from "../../store/userProfileStore";

const Caption = ({post}) => {
    const userProfile=useUserProfileStore(state=>state.userProfile)
  return (
    <div className="text-white">
      <Flex gap={4}>
        <NavLink to={`/${userProfile.username}`}>
          <Avatar src={userProfile?.profilePicURL} size={"sm"} />
        </NavLink>
        <Flex direction={"column"}>
          <Flex gap={2} alignItems={"center"}>
            <NavLink to={`/${userProfile.username}`}>
              <Text fontWeight={"bold"} fontSize={12} minWidth={"100px"}>
                {userProfile?.username}
              </Text>
            </NavLink>

            <Text fontSize={12} color={"gray.500"}>
              {post.caption}
            </Text>
          </Flex>
          <Text fontSize={12} color={"gray"}>
            {timeAgo(post.createdAt)}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};
export default Caption;
