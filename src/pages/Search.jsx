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
          <Box ml={4} display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={"#374159"}  color={'white'} border={"1px solid gray"} borderRadius={12} maxW={"440px"}>
          <ModalHeader fontSize={13} color={"white"}>Search User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl color={"white"}>
                <FormLabel fontSize={'15'} >Username</FormLabel>
                <Input fontSize={'15'} placeholder="Example:avazali13" ref={searchRef} />
              </FormControl>
              <Flex w={"full"} justifyContent={"flex-end"}>
                <Button
                  type="submit"
                  ml={"auto"}
                  size={"md"}
                  my={4}
                  isLoading={isLoading}
                >
                  Search
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

// 2-COPY AND PASTE FOR THE MODAL

/* <Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea placeholder='Post caption...' />

						<Input type='file' hidden />

						<BsFillImageFill
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>
					</ModalBody>

					<ModalFooter>
						<Button mr={3}>Post</Button>
					</ModalFooter>
				</ModalContent>
			</Modal> */
