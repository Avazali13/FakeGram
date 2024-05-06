/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { reload } from "firebase/auth";

const useSignUpWithEmail = () => {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, loading, error] =
  useCreateUserWithEmailAndPassword(auth);

  const loginUser = useAuthStore((state) => state.login);
  const signup = async ({ password, email, fullName, userName }) => {
    if (!email || !password || !userName || !fullName) {
      toast.error("Please fill all the fields");
      return;
    }

    const usersRef = collection(firestore, "users");

    const q = query(usersRef, where("username", "==", userName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      toast.error("username is already exists");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(email, password);
      if (!newUser) {
        toast.error("There is a user with this email");
        return;
      }

      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: email,
          username: userName.toLowerCase().replaceAll(' ',''),
          fullName: fullName,
          bio: "",
          profilePicURL: "",
          backgrondPicURL:'',
          followers: [],
          following: [],
          posts: [],
          blocked:[],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        await setDoc(doc(firestore, "userchats", newUser.user.uid), {
          chats:[],
        });
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { loading, error, signup };
};
export default useSignUpWithEmail;
