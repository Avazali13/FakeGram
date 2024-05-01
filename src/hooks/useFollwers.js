import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useGetUserProfileByUsername from "./useGetUserProfileByUsername";
import { useParams } from "react-router-dom";

const useGetFollowers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [followerUsers, setFollowerUsers] = useState([]);
  // const authUser = useAuthStore((state) => state.user);
  const { username } = useParams();
  const { userProfile } = useGetUserProfileByUsername(username);

  useEffect(() => {
    const getFollowers = async () => {
      setIsLoading(true);
      try {
        if (!userProfile || !userProfile.followers.length) {
          setIsLoading(false);
          return;
        }

        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("uid", "in", userProfile.followers));
        const querySnapshot = await getDocs(q);
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setFollowerUsers(users);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userProfile) {
      getFollowers();
    }
  }, [userProfile]); 

  return { isLoading, followerUsers };
};

export default useGetFollowers;
