import {
  Box,
  Container,
  Flex,
  Heading,
  Img,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";

import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={"container.md"} py={0} px={0}>
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap="2">
              <SkeletonCircle size="10" />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton height="10px" w={"200px"} />
                <Skeleton height="10px" w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"400px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length === 0 && (
        <>
        {/* pt-0 md:pt-20 */}
       <div className="flex absolute top-[24rem] md:top[18rem] flex-col justify-center items-center gap-3 ">
       <div className="w-[14rem] md:w-[30rem]">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            id="data-not-found"
          >
            <path
              fill="none"
              stroke="#29abe2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M23.5,27.5H6.5l-1-15.19a.76.76,0,0,1,.77-.81H10a1.11,1.11,0,0,1,.89.44l1.22,1.56H23.5v2"
            ></path>
            <path
              fill="none"
              stroke="#29abe2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M26.3,20.7l.84-3.2H9.25L6.5,27.5H23.41a1.42,1.42,0,0,0,1.37-1.06l.76-2.88"
            ></path>
            <path
              fill="none"
              stroke="#29abe2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5,24.5h0a1.42,1.42,0,0,1,2,0h0"
            ></path>
            <line
              x1="13.5"
              x2="14.5"
              y1="21.5"
              y2="21.5"
              fill="none"
              stroke="#29abe2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></line>
            <line
              x1="20.5"
              x2="21.5"
              y1="21.5"
              y2="21.5"
              fill="none"
              stroke="#29abe2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></line>
            <path
              fill="none"
              stroke="#29abe2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M20.62,3.61C18.25,4,16.5,5.37,16.5,7a2.57,2.57,0,0,0,.7,1.7l-.7,2.8,2.86-1.43A8.12,8.12,0,0,0,22,10.5c3,0,5.5-1.57,5.5-3.5,0-1.6-1.69-2.95-4-3.37"
            ></path>
            <line
              x1="21.25"
              x2="22.75"
              y1="6.25"
              y2="7.75"
              fill="none"
              stroke="#29abe2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></line>
            <line
              x1="22.75"
              x2="21.25"
              y1="6.25"
              y2="7.75"
              fill="none"
              stroke="#29abe2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></line>
          </svg>
        </div>
        <Heading className="text-center" fontSize={{base:'2rem',md:'2.5rem'}}  style={{color:'#29ABE2'}}>You don't have any friends or Your friend don't share anything</Heading>
       </div>
        </>
      )}
    </Container>
  );
};

export default FeedPosts;
