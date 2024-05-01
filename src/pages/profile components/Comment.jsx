import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { NavLink } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

function Comment({ comment }) {
  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);
  if (isLoading) return <CommentSkeleton />;
  return (
    <div >
      <Flex gap={4} mb={3}    color={"#e0e7ff"} >
        <NavLink to={`/${userProfile.username}`}>
          <Avatar src={userProfile?.profilePicURL}  size={"md"} />
        </NavLink>
        <Flex direction={"column"}>
          <Flex gap={2}>
            <NavLink to={`/${userProfile.username}`}>
              <Text fontWeight={"bold"} fontSize={15} minWidth={"100px"} >
                {userProfile?.username}
              </Text>
            </NavLink>
            
            <Text fontSize={15} color={"gray.400"} fontFamily={'serif'}>
              {comment.comment}
            </Text>
          </Flex>
          <Text fontSize={12} color={"gray"} >
          {timeAgo(comment.createdAt)}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
}

export default Comment;

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w="10" />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};
