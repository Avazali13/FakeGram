import {
  Avatar,
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "./Comment";
import PostFooter from "./PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import usePostStore from "../../store/postStore";
import Caption from "./Caption";

function ProfilePost({ post }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPost = useUserProfileStore((state) => state.deletePost);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure?")) return;
    if (isDeleting) return;
    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      deletePost(post?.id);
      decrementPost(post?.id);
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={"50"}>
            <Flex color={"white"}>
              <AiFillHeart size={20} />
              <Text fontWeight={"BOLD"} ml={2}>
                {post?.likes.length}
              </Text>
            </Flex>
            <Flex color={"white"}>
              <FaComment size={20} />
              <Text fontWeight={"BOLD"} ml={2}>
                {post?.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          alt="profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "90vw", md: "6xl" }}
      >
        <ModalOverlay />
        <ModalContent
        >
          <ModalCloseButton
            color={"white"}
            size={"md"}
            position={"absolute"}
            zIndex={10}
            bg={"teal"}
          />
          <ModalBody bg={"#374159"} pb={5}>
         
            <Flex
              maxH={"80vh"}
              minH={"50vh"}
              gap="4"
              w={"full"}
              mx={"auto"}
              flexDir={{ base: "column", md: "row" }}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1}
                justifyContent={"center"}
                alignItems={"center"}
                margin={"auto"}
                maxW={{ sm: "80vw", md: "100vw" }}
               
              >
                <Image src={post.imageURL} alt="profile post" />
              </Flex>
              <VStack
                flex={1}
                flexDir={"column"}
                px={10}
                py={4}
                justifyContent={"start"}
                alignItems={"start"}
                color={"white"}
              >
                <Flex alignItems={"center"} gap={4}>
                  <Avatar
                    src={userProfile.profilePicURL}
                    size={"sm"}
                    name="coder13"
                  />
                  <Text fontWeight={"bold"} fontSize={14}>
                    {userProfile?.username}
                  </Text>
                </Flex>
                <Divider my={4} bg={"gray.500"} w={"full"} />
                <Caption post={post} />
                <VStack
                  w="full"
                  alignItems={"start"}
                  maxH={"250px"}
                  overflowY={"auto"}
                  mt={4}
                  color={"white"}
                >
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
                </VStack>
                <Divider my={4} bg={"gray.800"} w={"full"} />
                <PostFooter post={post} isProfilePage={true} />
                {authUser?.uid === userProfile?.uid && (
                  <Button
                    bg={"transparent"}
                    colorScheme={"red"}
                    borderRadius={4}
                    p={1}
                    mt={4}
                    onClick={handleDeletePost}
                    isLoading={isDeleting}
                  >
                    <MdDelete size={20} />
                  </Button>
                )}
              </VStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfilePost;
