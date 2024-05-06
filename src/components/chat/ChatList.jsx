import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { Avatar } from "@chakra-ui/react";
import AddUser from "./AddUser";
import useAuthStore from "../../store/authStore";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../store/chatStore";

import toast from "react-hot-toast";

const ChatList = () => {
  const items = "flex items-center gap-5 cursor-pointer p-5 border-b-2";
  const text = "flex flex-col gap-2";

  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  const authUser = useAuthStore((state) => state.user);
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(firestore, "userchats", authUser.uid),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(firestore, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unsub();
    };
  }, [authUser.uid]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(firestore, "userchats", authUser.uid);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.user.username.toLowerCase().includes(input.toLowerCase())
  );
  return (
    <div className="flex-1 overflow-y-auto max-h-[60rem]">
      <div className="flex items-center gap-5 p-5">
        <div className="flex flex-1 items-center gap-5 rounded-md bg-gray-100 px-3 py-2">
          <CiSearch className="text-gray-500 cursor-pointer" />
          <input
            className="bg-transparent border-none outline-none flex-1 placeholder-gray-500 focus:outline-none"
            type="text"
            placeholder="Search..."
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <span
          onClick={() => setAddMode((prev) => !prev)}
          className="cursor-pointer text-5xl"
        >
          {addMode ? <FaMinus /> : <IoMdAdd />}
        </span>
      </div>
      {filteredChats.map((chat) => (
        <div
          className={items}
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <Avatar
            size={"xl"}
            src={
              chat.user.blocked.includes(authUser.uid)
                ? "null"
                : chat.user.profilePicURL
            }
          />
          <div className={text}>
            <span className="font-semibold">
              {chat.user.blocked.includes(authUser.uid)
                ? "User"
                : chat.user.username}
            </span>
            <p>
              {chat.user.blocked.includes(authUser.uid)
                ? "User"
                : chat.lastMessage}
            </p>
          </div>
        </div>
      ))}

      {addMode && <AddUser setAddMode={setAddMode} />}
    </div>
  );
};
export default ChatList;
