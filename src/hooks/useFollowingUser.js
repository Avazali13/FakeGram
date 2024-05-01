import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useGetUserProfileByUsername from "./useGetUserProfileByUsername";
import { useParams } from "react-router-dom";

const useGetFollowingUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [followingUsers, setFollowingUsers] = useState([]);
  const { username } = useParams();
  const { userProfile } = useGetUserProfileByUsername(username);


  useEffect(() => {
    const getFollowingUsers = async () => {
      setIsLoading(true);
      try {
        if (!userProfile || !userProfile.following.length) {
          setIsLoading(false);
          return;
        }

        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("uid", "in", userProfile.following));
        const querySnapshot = await getDocs(q);
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        setFollowingUsers(users);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userProfile) {
      getFollowingUsers();
    }
  }, [userProfile]); 

  return { isLoading, followingUsers };
};

export default useGetFollowingUsers;
