import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { firestore } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(firestore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [userId, setUserProfile]);

  return { isLoading, setUserProfile, userProfile };
};
export default useGetUserProfileById;
