import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
  Input,
  Image,
  CloseButton,
} from "@chakra-ui/react";

import { BsFillImageFill } from "react-icons/bs";
import { CreatePostLogo } from "../assets/Logo";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import useUserProfileStore from "../store/userProfileStore";

import toast from "react-hot-toast";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useLocation } from "react-router-dom";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const imageRef = useRef(null);

  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption("");
      setSelectedFile(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          // p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box ml={1} color={"#4b5563"} display={{ base: "none", md: "block" }}>
            Create
          </Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent
          bg={"#f9fafb"}
       
          borderRadius={12}
          maxW={{ base: "270px", md: "440px" }}
        >
          <ModalHeader fontSize={14}>
            <p className="pl-5 pt-[5px]">Create Post</p>
          </ModalHeader>
          <ModalCloseButton
            color={"#4B5563"}
            size={"lg"}
            top={5}
            right={5}
            tabIndex={-1}
          />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              minHeight={{ base: "70px", md: "130px" }}
              width={{ base: "380px" }}
              _placeholder={{ color: "#a8a8a8" }}
       
              fontSize={14}
              border={"2px solid #c3c3c3"}
              display={"flex"}
              marginLeft={13}
            />

            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <BsFillImageFill
              onClick={() => imageRef.current.click()}
              style={{
                marginTop: "15px",
                marginLeft: "13px",
                cursor: "pointer",
              }}
              size={20}
            />
            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} alt="selected_img" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile("");
                  }}
                ></CloseButton>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handlePostCreation}
              isLoading={isLoading}
              mr={6}
              mb={4}
              fontSize={14}
              colorScheme="blue"
            >
              <p className="py-8 px-6 text-[1.4rem]">Post</p>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>{" "}
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { pathname } = useLocation();

  // console.log(pathname);

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please Select Image");
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };
    try {
      setIsLoading(true);
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      if (userProfile.uid === authUser.uid) {
        createPost({ ...newPost, id: postDocRef.id });
      }
      if (pathname !== "/" && userProfile.uid === authUser.uid) {
        addPost({ ...newPost, id: postDocRef.id });
      }

      toast.success("Post Created Successfully");
    } catch (error) {
      toast.error("gs");
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, handleCreatePost };
}
