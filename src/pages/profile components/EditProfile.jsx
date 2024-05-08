//^Design from GPT
import {
  Avatar,
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
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import toast from "react-hot-toast";
import usePreviewImgBg from "../../hooks/usePreviewImgBg";

const EditProfile = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    bio: "",
  });

  const authUser = useAuthStore((state) => state.user);


  const fileRef = useRef(null);
  const fileRefs = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
  const { selectedFiles, handleImageChanges, setSelectedFiles } =
    usePreviewImgBg();
  const { isUpdating, editProfile } = useEditProfile();
  const handleEditProfile = async () => {

    try {
      await editProfile(inputs, selectedFile, selectedFiles);
      setSelectedFile(null);
      setSelectedFiles(null);
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const defaultİmg =
  "https://images.unsplash.com/photo-1617395440873-63f6e7f25139?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <Modal isOpen={isOpen} onClose={onClose} colorScheme="blue">
      <ModalOverlay />
      <ModalContent position={"absolute"} top={0} bg="white" borderRadius="xl" minW={{base:'10rem',md:'43rem'}}>
        <ModalHeader ><p className="text-[2rem] pt-4">Edit Profile</p></ModalHeader>
        <ModalCloseButton color={"#4B5563"} size={"xl"} top={10} right={7} tabIndex={-1} />
        <ModalBody>
          <Flex direction="column" align="center" p={6}>
            <Avatar
              size={{base:'xl',md:'2xl'}}
              src={selectedFile || authUser.profilePicURL}
              mb={3}
            />

            <img src={selectedFiles || authUser.backgrondPicURL || defaultİmg} alt="bg" className="max-w-[15rem] max-h-[10rem] md:max-h-[18rem] md:max-w-[31rem]" />

            <Button onClick={() => fileRefs.current.click()} mt={3} mb={4} size={'lg'} paddingX={4} paddingY={5} >
              Edit bg
            </Button>
            <Input
              type="file"
              hidden
              ref={fileRefs}
              onChange={handleImageChanges}
            />
            <Button onClick={() => fileRef.current.click()} mb={4} size={'lg'} paddingX={4} paddingY={5}>
              Edit Profile Picture
            </Button>
            <Input
              type="file"
              hidden
              ref={fileRef}
              onChange={handleImageChange}
            />
            <FormControl mt={4}>
              <FormLabel fontSize={{base:10,md:14}} >Full Name</FormLabel>
              <Input
                placeholder="Full Name"
              fontSize={{base:10,md:13}}
              height={{base:'3rem',md:'4rem'}}
                defaultValue={authUser.fullName}
                onChange={(e) =>
                  setInputs({ ...inputs, fullName: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontSize={{base:10,md:14}} >Username</FormLabel>
              <Input
                placeholder="Username"
                defaultValue={authUser.username}
                fontSize={{base:10,md:13}}
                height={{base:'3rem',md:'4rem'}}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontSize={{base:10,md:14}} >Bio</FormLabel>
              <Input
                placeholder="Bio"
                fontSize={{base:10,md:13}}
                defaultValue={authUser.bio}
                height={{base:'3rem',md:'4rem'}}
                onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
    
           
              />
            </FormControl>
            <Stack direction="row" mt={6} spacing={4}>
              <Button
                // colorScheme="red"
                bg={'#e13b3b'}
                _hover={{ bg: "#b31a1a" }}
              color={'white'}

                onClick={onClose}
                isLoading={isUpdating}
                size={'lg'}
              >
                <p className=" text-[1.4rem]">Cancel</p>
              </Button>
              <Button
              _hover={{ bg: "#1458bc" }}
              bg={'#3083ff'}
              color={'white'}
              size={'lg'}
                onClick={handleEditProfile}
                isLoading={isUpdating}
              >
                <p className=" text-[1.4rem]">Submit</p>
              </Button>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
