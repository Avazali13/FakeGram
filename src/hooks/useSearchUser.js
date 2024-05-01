import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState();
  const [user, setUser] = useState(null);

  const getUserProfile = async (username) => {
    setIsLoading(true)
    setUser(null)
    try {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return toast.error("user not found");

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      //
    } catch (error) {
      toast.error(error.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, getUserProfile, user,setUser };
};
export default useSearchUser;
