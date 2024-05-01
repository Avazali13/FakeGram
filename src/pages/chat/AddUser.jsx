
import { useRef, useState } from "react";
import styled from "styled-components";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {  firestore } from "../../firebase/firebase";
import useAuthStore from "../../store/authStore";
import toast from "react-hot-toast";

const Adduser = styled.div`
  padding: 30px;
  background-color: black;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: max-content;
  color: white;
  height: max-content;
  z-index: 10000;
`;
const User = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const AddUser = ({setAddMode}) => {
  const [isAdded, setIsAdded] = useState(false);
  const searchRef = useRef(null);
  let { user, isLoading, getUserProfile, setUser } = useSearchUser();
  console.log(user);
  const authUser = useAuthStore((state) => state.user);

  const handleSearch = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
    console.log(searchRef);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const chatRef = collection(firestore, "chats");
    const userChatsRef = collection(firestore, "userchats");

    try {
      if (user.uid === authUser.uid) {
        toast.error("Cannot add yourself.");
        // Handle UI feedback or prevent adding user here
        return;
      }

      const currentUserChatsDoc = await getDoc(doc(userChatsRef, authUser.uid));
      const currentUserChats = currentUserChatsDoc.data().chats || [];
      const existingChat = currentUserChats.find(
        (chat) => chat.receiverId === user.uid
      );

      if (existingChat) {
        toast.error("Chat already exists with this user.");
        // Handle UI feedback or prevent adding user here
        return;
      }

      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: authUser.uid,
          updateAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, authUser.uid), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.uid,
          updateAt: Date.now(),
        }),
      });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Adduser>
      <form className="flex gap-5" onSubmit={handleSearch}>
      <button onClick={()=>setAddMode(false)} className="absolute top-0 right-2 cursor-pointer hover:text-slate-500 transition-all">X</button>
        <input
          className="p-5 border-none outline-none rounded-xl text-sky-600"
          type="text"
          name="username"
          placeholder="UserName"
          ref={searchRef}
        />
        <button className="p-5 rounded-xl bg-sky-400">Search</button>
      </form>
      <User>
        <Detail>
          {/* <Avatar /> */}
          {/* <span>Jane Doe</span> */}
          {user && <SuggestedUser yes={true} user={user} setUser={setUser} />}
        </Detail>
        {user && !isAdded && (
          <button disabled={isLoading} onClick={handleAdd} className="p-5 rounded-xl bg-sky-400">
            Add User
          </button>
        )}
      </User>
    </Adduser>
  );
};
export default AddUser;
