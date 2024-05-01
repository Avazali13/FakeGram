import { NavLink, Outlet, useParams } from "react-router-dom";
import styled from "styled-components";

// import Avatar from "../../ui/Avatar";
import Card from "../../ui/Card";

import { IoDocumentTextOutline } from "react-icons/io5";
import { SlUserFollowing } from "react-icons/sl";
// import { IoIosImages } from "react-icons/io";
import { PiUsersThree } from "react-icons/pi";
import useAuthStore from "../../store/authStore";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import PageNotFound from "../PageNotFound";
import {
  Avatar,
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";

// import PostCard from "../ui/PostCard";

const StyledNav = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    border-bottom: solid 0.2rem white;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-blue-200);
    border-radius: var(--border-radius-sm);
  }
`;

function ProfileLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username } = useParams();

  // console.log(username);
  // const userName = useAuthStore((state) => state.user);
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);
  const authUser = useAuthStore((state) => state.user);
  console.log(userProfile);

  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );

  const visitingOwnProfileAndAuth =
    authUser && authUser?.username === userProfile?.username;
  const userNotFound = !isLoading && !userProfile;

  if (userNotFound) return <PageNotFound />;

  return (
    <>
      {isLoading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <Card noPadding={true}>
          <div className="relative overflow-hidden rounded-xl bg-slate-50">
            <div className="h-80 overflow-hidden flex justify-center items-center">
              <img
                src="https://images.unsplash.com/photo-1713257510109-4cbfec05ff1d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="post-img"
              />
            </div>
            <div className="absolute top-60 left-4 ">
              <Avatar size="2xl" src={userProfile?.profilePicURL} />
            </div>

            <div className="p-4 pt-1 md:pt-4 pb-0 ">
              <div className="ml-48 md:ml-60 flex flex-col gap-5">
                <h1 className="text-3xl font-semibold">
                  {userProfile?.username}
                </h1>
                <span>
                  {visitingOwnProfileAndAuth && (
                    <Button
                      onClick={onOpen}
                      colorScheme="red"
                      size="lg"
                      variant="solid"
                    >
                      Edit
                    </Button>
                  )}
                  {visitingOwnProfileAndAuth || (
                    <Button
                      onClick={handleFollowUser}
                      colorScheme={isFollowing ? 'red' :'blue'} 
                      size="lg"
                      variant="solid"
                      fontWeight={'bold'}
                      fontSize={16}
                      padding={'20px 25px'}
                      disabled={isUpdating}
                    >
                      {isFollowing ? <p >Unfollow</p>: <p>Follow </p>}
                    </Button>
                  )}
                </span>
                <div className="text-gray-500 leading-4 pt-4 flex gap-5">
                  <p className="flex flex-col md:flex-row gap-3 md:gap-1 items-center">
                    <span className="font-bold text-black">
                      {userProfile?.posts?.length}{" "}
                    </span>{" "}
                    Posts
                  </p>
                  <p className="flex flex-col md:flex-row gap-3 md:gap-1 items-center">
                    <span className="font-bold text-black">
                      {userProfile?.followers?.length}{" "}
                    </span>{" "}
                    Followers
                  </p>
                  <p className="flex flex-col md:flex-row gap-3 md:gap-1 items-center">
                    <span className="font-bold text-black">
                      {userProfile?.following?.length}{" "}
                    </span>{" "}
                    Following
                  </p>
                </div>
                <div>
                  <p className="font-bold mb-2">
                    {userProfile?.fullName.toUpperCase()}
                  </p>
                  <p className="text-gray-500">{userProfile.bio}</p>
                </div>
              </div>
              <div className="md:mt-24 mt-16 flex justify-between md:justify-normal  md:gap-9 ">
                <StyledNav to="posts">
                  <span className="text-4xl">
                    <IoDocumentTextOutline />
                  </span>
                  <span className="hidden sm:block">Posts</span>
                </StyledNav>

                <StyledNav to="following">
                  <span className="text-4xl">
                    <PiUsersThree />
                  </span>

                  <span className="hidden sm:block">Following</span>
                </StyledNav>

                <StyledNav to="followers">
                  <span className="text-4xl">
                    <SlUserFollowing />
                  </span>

                  <span className="hidden sm:block">Followers</span>
                </StyledNav>
              </div>
            </div>
          </div>
          {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
        </Card>
      )}
      <Outlet />
    </>
  );
}

export default ProfileLayout;

// skeleton for profile header
const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size="24" />

      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};
