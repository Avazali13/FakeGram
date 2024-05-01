

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
  import Comment from "../profile components/Comment";
  import usePostsComment from "../../hooks/usePostsComment";
  import { useEffect, useRef, useState } from "react";
  import toast from "react-hot-toast";

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
        const container = scrollableContainerRef.current;
        const lastFewComments = Array.from(container.children).slice(-4);
        const lastFewCommentsHeight = lastFewComments.reduce((acc, child) => acc + child.offsetHeight, 0);
        const containerHeight = container.offsetHeight;
    
        if (lastFewCommentsHeight > containerHeight) {
          container.scrollTop = container.scrollHeight;
        } 
        else {
          container.scrollTop = container.scrollHeight - lastFewCommentsHeight;
        }

      }
    }, [isOpen, comments]);
    

    
    

    return (
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent
          bg={"#374159"}
          color={"#e0e7ff"}
          border={"1px solid gray"}
          maxW={"540px"}
          // maxH={"450px"}
          borderRadius={12}
          overflow={"scroll"}
          overflowX={'hidden'}
          overflowY={'hidden'}
          
        >
          <ModalHeader>All Comments</ModalHeader>
          <ModalCloseButton size={'xl'} />
          <ModalBody pb={6 }>
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
              <Input placeholder="Add a comment" size={"md"} border={'1px solid #B3DFF7'} ref={commentRef} />
              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"md"}
                  my={4}
                  isLoading={isCommenting}
                >
                  Post
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