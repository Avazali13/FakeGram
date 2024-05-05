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
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );

  const visitingOwnProfileAndAuth =
    authUser && authUser?.username === userProfile?.username;
  const userNotFound = !isLoading && !userProfile;

  if (userNotFound) return <PageNotFound />;
  const defaultİmg =
    "https://images.unsplash.com/photo-1617395440873-63f6e7f25139?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <>
      {isLoading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <Card noPadding={true}>
          <div className="relative overflow-hidden rounded-xl bg-slate-50">
            <div className="h-60 md:h-[34rem]  object-contain overflow-hidden flex justify-center items-center">
              <img
              
                src={userProfile?.backgrondPicURL || defaultİmg}
                alt="post-img"
              />
            </div>
            <div className="absolute bottom-[21rem] left-8 md:bottom-[22rem] md:left-20 ">
              <Avatar
                size={{ base: "xl", md: "2xl" }}
                src={userProfile?.profilePicURL}
              />
            </div>

            <div className="p-4 pt-1 md:pt-4 pb-0 ">
              <div className="ml-48 md:ml-60 flex flex-col gap-5">
                <h1 className=" text-2xl md:text-3xl font-semibold pt-4">
                  {userProfile?.username}
                </h1>
                <span>
                  {visitingOwnProfileAndAuth && (
                    <Button
                      onClick={onOpen}
                      colorScheme="blue"
                      size="md"
                      variant="solid"
                    >
                    <p className="text-[1.8rem]"> Edit </p>
                    </Button>
                  )}
                  {visitingOwnProfileAndAuth || (
                    <Button
                      onClick={handleFollowUser}
                      colorScheme={isFollowing ? "red" : "blue"}
                      size="lg"
                      variant="solid"
                      fontWeight={"bold"}
                      fontSize={16}
                      padding={"20px 25px"}
                      disabled={isUpdating}
                    >
                      {isFollowing ? <p>Unfollow</p> : <p>Follow </p>}
                    </Button>
                  )}
                </span>
                <div className="text-gray-500  leading-4 pt-4 flex gap-5">
                  <p className="flex flex-col md:flex-row gap-3 md:gap-1 items-center md:text-[1.8rem] text-[1.5rem]">
                    <span className="font-bold text-black">
                      {userProfile?.posts?.length}{" "}
                    </span>{" "}
                    <p className="pl-2">Posts</p>
  
                  </p>
                  <p className="flex flex-col md:flex-row gap-3 md:gap-1 items-center md:text-[1.8rem] text-[1.5rem]">
                    <span className="font-bold text-black">
                      {userProfile?.followers?.length}{" "}
                    </span>{" "}
                    <p className="pl-2"> Followers</p>
            
                  </p>
                  <p className="flex flex-col md:flex-row gap-4 md:gap-1 items-center md:text-[1.8rem] text-[1.5rem]">
                    <span className="font-bold text-black">
                      {userProfile?.following?.length}{" "}
                    </span>{" "}
                
                    <p className="pl-2"> Following</p>
                  </p>
                </div>
                <div>
                  <p className="mt-4 text-xl md:text-3xl font-bold mb-2">
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
