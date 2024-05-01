
//^Design from GPT
import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import toast from "react-hot-toast";

const EditProfile = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    bio: "",
  });

  const authUser = useAuthStore((state) => state.user);
 
  const fileRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
  const { isUpdating, editProfile } = useEditProfile();
  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} colorScheme="blue">
      <ModalOverlay />
      <ModalContent bg="white" borderRadius="xl">
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" align="center" p={6}>
            <Avatar
              size="xl"
              src={selectedFile || authUser.profilePicURL}
              mb={4}
            />
            <Button onClick={() => fileRef.current.click()} mb={4}>
              Edit Profile Picture
            </Button>
            <Input
              type="file"
              hidden
              ref={fileRef}
              onChange={handleImageChange}
            />
            <FormControl mt={4}>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Full Name"
                defaultValue={authUser.fullName}
                onChange={(e) =>
                  setInputs({ ...inputs, fullName: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                defaultValue={authUser.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Bio</FormLabel>
              <Input
                placeholder="Bio"
                defaultValue={authUser.bio}
                onChange={(e) =>
                  setInputs({ ...inputs, bio: e.target.value })
                }
              />
            </FormControl>
            <Stack direction="row" mt={6} spacing={4}>
              <Button
                colorScheme="red"
                onClick={onClose}
                isLoading={isUpdating}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleEditProfile}
                isLoading={isUpdating}
              >
                Submit
              </Button>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
