import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/Logo.jsx";
import usePostsComment from "../../hooks/usePostsComment.js";
import useLikePost from "../../hooks/useLikePost.js";
import { timeAgo } from "../../utils/timeAgo.js";
import CommentModal from "../../components/Home/CommentModal.jsx";

const PostFooter = ({ post, isProfilePage, creatorProfile,fill }) => {
  const { isCommenting, handlePostComment } = usePostsComment();
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const { handleLikePost, likes, isLiked } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  //^For Input

  return (
    <Box mb={20} marginTop={"auto"} pl={1}>
      <Flex alignItems={"center"} gap={5} w={"full"} pt={0} mb={2} mt={4} >
        <Box cursor={"pointer"} fontSize={18} onClick={handleLikePost} >
          {!isLiked ? <NotificationsLogo fill={fill} /> : <UnlikeLogo  />}
        </Box>

        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <CommentLogo fill={fill} />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"xl"} mb={2} color={'black'}>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize="12" color={"gray"}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontSize="xl" fontWeight={700} mb={5}>
            {creatorProfile?.username}{" "}
            <Text as="span" fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text
              fontSize="xl"
              // color={"gray"}
              cursor={"pointer"}
              onClick={onOpen}
            >
              View all {post.comments.length} comments
            </Text>
          )}
          {isOpen ? (
            <CommentModal isOpen={isOpen} onClose={onClose} post={post} />
          ) : null}
        </>
      )}

      <Flex
        alignItems={"center"}
        gap={2}
        justifyContent={"space-between"}
        w={"full"}
 
  
      >
        <InputGroup>
          <Input
            mt={3}
            variant={"flushed"}
            // color={"#e0e7ff"}
            color={'white'}
            placeholder={"Add a comment..."}
            fontSize="14px"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            ref={commentRef}
          />
          <InputRightElement>
            <Button
              // bgImage="url('https://bit.ly/2Z4KKcF')"
              mr={4}
              mt={4}
              color={"blue.500"}
              fontWeight={600}
              cursor={"pointer"}
              fontSize="16px"
              // _hover={{ color: "#4f46e5" }}
              _hover={{ color: "red" }}
              transition={"0.3s ease-in-out"}
              bg={"transparent"}
              onClick={handleSubmitComment}
              isLoading={isCommenting}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default PostFooter;
