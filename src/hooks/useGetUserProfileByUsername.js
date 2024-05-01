import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
        setIsLoading(true);
        try {
            const q = query(collection(firestore, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) return setUserProfile(null);

            let userDoc;
            querySnapshot.forEach((doc) => {
                userDoc = doc.data();
            });

            setUserProfile(userDoc);
            // console.log(userDoc);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    getUserProfile();
}, [setUserProfile, username]);

return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
// 