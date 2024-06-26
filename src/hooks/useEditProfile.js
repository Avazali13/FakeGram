import { useState } from "react";
import useAuthStore from "../store/authStore";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import useUserProfileStore from "../store/userProfileStore";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState();
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const editProfile = async (inputs, selectedFile, selectedFiles) => {
    if (isUpdating && !authUser) return;
    setIsUpdating(true);

    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(firestore, "users", authUser.uid);
    const storageRefs = ref(storage, `bgPics/${authUser.uid}`);
    const userDocRefs = doc(firestore, "users", authUser.uid);
    let URL = "";
    let URLS = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      if (selectedFiles) {
        await uploadString(storageRefs, selectedFiles, "data_url");
        URLS = await getDownloadURL(ref(storage, `bgPics/${authUser.uid}`));
      }

      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username.toLowerCase().replaceAll(' ','') || authUser.username,
        // username: inputs.username.toLowerCase(),
        // username: inputs.username ? inputs.username.toLowerCase() : null,
        // bio: inputs.bio || authUser.bio,
        bio: inputs.bio ? inputs.bio || authUser.bio : "",

        profilePicURL: URL || authUser.profilePicURL,
        backgrondPicURL: URLS || authUser.backgrondPicURL,
      };
      await updateDoc(userDocRef, updatedUser);
      await updateDoc(userDocRefs, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { editProfile, isUpdating };
};
export default useEditProfile;
