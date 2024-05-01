import { useState } from "react";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const usePostsComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore((state) => state.addComment);

  const handlePostComment = async (postId, comment) => {
    if (!comment) {
      toast.error("You can't add empty comments");
      return;
    }
    if (isCommenting) return;
    if (!authUser) return toast.error("you must be logged in");
    setIsCommenting(true);
    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };
    try {
      await updateDoc(doc(firestore, "posts", postId), {
        comments: arrayUnion(newComment),
      });
      addComment(postId, newComment);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsCommenting(false);
    }
  };
  return { isCommenting, handlePostComment };
};
export default usePostsComment;
