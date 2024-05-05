import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { TiUserAdd } from "react-icons/ti";
import useSearchUser from "../hooks/useSearchUser";
import { useRef } from "react";
import SuggestedUser from "./SuggestedUsers/SuggestedUser";
// import { CreatePostLogo } from "../../assets/constants";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);
  let { user, isLoading, getUserProfile, setUser } = useSearchUser();
  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };
  //   console.log(user);

  const handleClose = () => {
    onClose();
    setUser(null);
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
          //   gap={4}
          //   _hover={{ bg: "red" }}
          //   borderRadius={6}
          //   p={2}
          //   w={{ base: 10, md: "full" }}
          //   justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <TiUserAdd />
          {/* <p className="ml-4 none">Search</p> */}
          {/* <Box>Search</Box> */}
          <Box color={"#4b5563"} ml={5} display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg="#F3F4F6"  color="#1F2937" border={"1px solid gray"} borderRadius={12} maxW={{base:"270px",md:'440px'}}>
          <ModalHeader fontSize={18} >Search User</ModalHeader>
          <ModalCloseButton color={'#4B5563'} size={'xl'} />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl  >
                <FormLabel fontSize={'16'} >Username</FormLabel>
                <Input padding={8} border={'1px solid #fc83bb'} fontSize={'16'} placeholder="Example:avazali13" ref={searchRef} mb={9} />
              </FormControl>
              <Flex w={"full"} mt={4} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"md"}
                
                  isLoading={isLoading}
                  colorScheme="blue"
                >
                <p className="text-[1.4rem]">  Search</p>
                </Button>
              </Flex>
            </form>
            {user && <SuggestedUser user={user} setUser={setUser} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

