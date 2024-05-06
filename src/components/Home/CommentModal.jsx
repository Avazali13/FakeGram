//!

import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../../pages/profile components/Comment";
import usePostsComment from "../../hooks/usePostsComment";
import { useEffect, useRef, useState } from "react";

const CommentModal = ({ isOpen, onClose, post }) => {
  const { handlePostComment, isCommenting } = usePostsComment();
  const commentRef = useRef(null);
  const scrollableContainerRef = useRef(null);
  const [comments, setComments] = useState([]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value = "";
  };

  useEffect(() => {
    //* Update comments whenever post changes
    setComments(post.comments);
  }, [post]);

  useEffect(() => {
    if (isOpen && scrollableContainerRef.current) {
      setTimeout(() => {
             const container = scrollableContainerRef.current;
      const lastFewComments = Array.from(container.children).slice(-4);
      const lastFewCommentsHeight = lastFewComments.reduce(
        (acc, child) => acc + child.offsetHeight,
        0
      );
      const containerHeight = container.offsetHeight;

      if (lastFewCommentsHeight > containerHeight) {
        container.scrollTop = container.scrollHeight;
      } else {
        container.scrollTop = container.scrollHeight - lastFewCommentsHeight;
      } 
      }, 500);

    }
  }, [isOpen, comments]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent
        position={{ base: "absolute", md: "relative" }}
        marginTop={"23rem"}
        marginLeft={{ base: "0", md: "13rem" }}
        bottom={0}
        bg="#1A202C"
        // bg="BLACK"
        color="#E2E8F0"
        border="1px solid #2D3748"
        // maxW={"540px"}
        maxW={{ base: "300px", md: "520px" }}
        // maxH={{base:'230px',md:'210px'}}
        // maxH={"450px"}
        borderRadius={12}
        overflow={"scroll"}
        overflowX={"hidden"}
        overflowY={"hidden"}
      >
        <ModalHeader>All Comments</ModalHeader>
        <ModalCloseButton size={"lg"} color="#CBD5E0" />
        <ModalBody>
          <div
            ref={scrollableContainerRef}
            style={{
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {comments.map((comment, i) => (
              <Comment key={i} comment={comment} />
            ))}
          </div>
          <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
            <Input
              placeholder="Add a comment"
              size={"lg"}
              border="1px solid #CBD5E0"
              ref={commentRef}
              // mb={4}
            />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                colorScheme="blue"
                size={"md"}
                mt={8}
                mb={4}
                isLoading={isCommenting}
              >
                <p className="text-[1.4rem]">Post</p>
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;

// useEffect(() => {
//   endRef.current?.scrollIntoView({ behavior: "smooth" });
// }, [user]);
