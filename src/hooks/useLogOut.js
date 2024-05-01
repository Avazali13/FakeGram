import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

const useLogOut = () => {
  const [signOut, isLoggingout, error] = useSignOut(auth);
  const logoutUser = useAuthStore((state) => state.logout);
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { handleLogout, isLoggingout, error };
};
export default useLogOut;
