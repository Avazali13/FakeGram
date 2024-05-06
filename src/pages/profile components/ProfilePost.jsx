// import {
//   Avatar,
//   Button,
//   Divider,
//   Flex,
//   GridItem,
//   Image,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalOverlay,
//   Text,
//   VStack,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { AiFillHeart } from "react-icons/ai";
// import { FaComment } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import Comment from "./Comment";
// import PostFooter from "./PostFooter";
// import useUserProfileStore from "../../store/userProfileStore";
// import useAuthStore from "../../store/authStore";
// import toast from "react-hot-toast";
// import { useState } from "react";
// import { deleteObject, ref } from "firebase/storage";
// import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import { firestore, storage } from "../../firebase/firebase";
// import usePostStore from "../../store/postStore";
// import { comment } from "postcss";
// import Caption from "./Caption";

// function ProfilePost({ post }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const userProfile = useUserProfileStore((state) => state.userProfile);
//   const authUser = useAuthStore((state) => state.user);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const deletePost = usePostStore((state) => state.deletePost);
//   const decrementPost = useUserProfileStore((state) => state.deletePost);

//   const handleDeletePost = async () => {
//     if (!window.confirm("are you sure?")) return;
//     if (isDeleting) return;
//     try {
//       const imageRef = ref(storage, `posts/${post.id}`);
//       await deleteObject(imageRef);
//       const userRef = doc(firestore, "users", authUser.uid);
//       await deleteDoc(doc(firestore, "posts", post.id));

//       await updateDoc(userRef, {
//         posts: arrayRemove(post.id),
//       });

//       deletePost(post?.id);
//       decrementPost(post?.id);
//       toast.success("post deleted succesfully");
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <>
//       <GridItem
//         cursor={"pointer"}
//         borderRadius={4}
//         overflow={"hidden"}
//         border={"1px solid"}
//         borderColor={"whiteAlpha.300"}
//         position={"relative"}
//         aspectRatio={1 / 1}
//         onClick={onOpen}
//       >
//         <Flex
//           opacity={0}
//           _hover={{ opacity: 1 }}
//           position={"absolute"}
//           top={0}
//           left={0}
//           right={0}
//           bottom={0}
//           bg={"blackAlpha.700"}
//           transition={"all 0.3s ease"}
//           zIndex={1}
//           justifyContent={"center"}
//         >
//           <Flex alignItems={"center"} justifyContent={"center"} gap={"50"}>
//             <Flex color={"white"}>
//               <AiFillHeart size={20} />
//               <Text fontWeight={"BOLD"} ml={2}>
//                 {post?.likes.length}
//               </Text>
//             </Flex>
//             <Flex color={"white"}>
//               <FaComment size={20} />
//               <Text fontWeight={"BOLD"} ml={2}>
//                 {post?.comments.length}
//               </Text>
//             </Flex>
//           </Flex>
//         </Flex>
//         <Image
//           src={post.imageURL}
//           alt="profile post"
//           w={"100%"}
//           h={"100%"}
//           objectFit={"cover"}
//         />
//       </GridItem>
//       <Modal
//         isOpen={isOpen}
//         onClose={onClose}
//         isCentered={true}
//         size={{ base: "3xl", md: "6xl" }}
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalCloseButton color={"white"} size={"4"} />
//           <ModalBody  bg="#1A202C" pb={5}>
//             <Flex
//               maxH={"60vh"}
//               minH={"50vh"}
//               gap="4"
//               w={{ base: "90%", sm: "70%", md: "full" }}
//               mx={"auto"}
//             >
//               <Flex
//                 borderRadius={4}
//                 overflow={"hidden"}
//                 border={"1px solid"}
//                 borderColor={"whiteAlpha.300"}
//                 flex={1.5}
//                 justifyContent={"center"}
//                 alignItems={"center"}
//               >
//                 <Image  src={post.imageURL} alt="ptofile post" w='100%' height='100%' objectFit={"cover"}/>
//               </Flex>
//               <Flex
//                 flex={1}
//                 flexDir={"column"}
//                 px={10}
//                 display={{ base: "none", md: "flex" }}
//               >
//                 <Flex alignItems={"center"} justifyContent={"space-between"}>
//                   <Flex alignItems={"center"} gap={4}>
//                     <Avatar
//                       src={userProfile.profilePicURL}
//                       size={"sm"}
//                       name="As a programmer"
//                     />
//                     <Text color={"white"} fontWeight={"bold"} fontSize={12}>
//                       {userProfile?.username}
//                     </Text>
//                   </Flex>
//                   {authUser?.uid === userProfile?.uid && (
//                     <Button
//                       szie={"sm"}
//                       bg={"transparent"}
//                       _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
//                       borderRadius={4}
//                       p={1}
//                       onClick={handleDeletePost}
//                       isLoading={isDeleting}
//                     >
//                       <MdDelete color="white" size={20} cursor={"pointer"} />
//                     </Button>
//                   )}
//                 </Flex>
//                 <Divider my={4} bg={"gray.500"} />
//                 <VStack
//                   w="full"
//                   alignItems={"start"}
//                   maxH={"350px"}
//                   overflowY={"auto"}
//                 >
//                   {post.caption && <Caption post={post} />}
//                   {post.comments.map((comment) => (
//                     <Comment key={comment?.id *8} comment={comment} />
//                   ))}
//                 </VStack>
//                 <Divider my={4} bg={"gray.8000"} />
//                 <PostFooter post={post} isProfilePage={true} fill='rgb(245, 245, 245)' />
//               </Flex>
//             </Flex>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default ProfilePost;

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
import { comment } from "postcss";
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
      toast.success("Post Deleted Successfully");
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
          objectFit={"contain"}
          // objectFit={'scale-down'}
          // bg={'#e5e7eb'}
          bg={"#f6f6f6"}
        />
      </GridItem>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "6xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            color={"#4B5563"}
            size={"xl"}
            top={6}
            right={7}
            tabIndex={-1}
          />
          <ModalBody
            bg="#F3F4F6"
            color="#1F2937"
            border={"2px solid gray"}
            pb={5}
          >
            <Flex
              maxH={"60vh"}
              minH={"50vh"}
              direction={{ base: "column", md: "row" }}
              gap="4"
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={post.imageURL}
                  alt="profile post"
                  // w={"100%"}
                  // h={"100%"}
                  // objectFit={"cover"}
                />
              </Flex>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                justifyContent={"center"}
                overflowY={"scroll"}
                py={12}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  marginTop={{ base: 120, md: 0 }}
                >
                  {!post.caption && (
                    <Flex alignItems={"center"} gap={4}>
                      <Avatar
                        src={userProfile.profilePicURL}
                        size={"sm"}
                        name="Avazali13"
                      />
                      <Text fontWeight={"bold"} fontSize={12}>
                        {userProfile?.username}
                      </Text>
                      {post.caption && <Caption post={post} />}
                    </Flex>
                  )}

                  {post.caption && (
                    <Flex alignItems={"center"} gap={4}>
                      {post.caption && <Caption post={post} />}
                    </Flex>
                  )}
                  {authUser?.uid === userProfile?.uid && (
                    <Button
                      mb={7}
                      size={"sm"}
                      bg={"transparent"}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      p={1}
                      onClick={handleDeletePost}
                      isLoading={isDeleting}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>
                <Divider my={6} bg={"gray.500"} />
                <div>
                  <VStack
                    alignItems={"start"}
                    w={"full"}
                    // overflowY={"auto"}
                    // flex={1}
                    // spacing={4}
                  >
                    {post.comments.map((comment) => (
                      <Comment key={comment?.id} comment={comment} />
                    ))}
                  </VStack>
                </div>
                <Divider my={{ base: 0, md: 4 }} bg={"gray.8000"} />
                <PostFooter
                  post={post}
                  isProfilePage={true}
                  fill="rgb(245, 245, 245)"
                />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfilePost;
