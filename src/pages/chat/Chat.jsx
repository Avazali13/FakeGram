import { Avatar } from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import { EmojiLogo } from "../../assets/Logo";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useChatStore } from "../../store/chatStore";

import { timeAgo } from "../../utils/timeAgo";
import toast from "react-hot-toast";

const Chat = () => {
  const [val, setVal] = useState("");
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState("");
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const authUser = useAuthStore((state) => state.user);
  const myMessage = "max-w-[350px] flex gap-5 self-end";
  const yourMessage = "max-w-[350px] flex gap-5";
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [user]);

  useEffect(() => {
    const unSub = onSnapshot(doc(firestore, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  console.log(chat);

  const handleEmoji = (e) => {
    setVal((val) => val + e.emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if (val === "") return;

    try {
      await updateDoc(doc(firestore, "chats", chatId), {
        messages: arrayUnion({
          senderId: authUser?.uid,
          val,
          createAt: new Date(),
        }),
      });

      const userIDs = [authUser?.uid, user?.uid];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(firestore, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = val;
          userChatsData.chats[chatIndex].isSeen =
            id === authUser?.uid ? true : false;
          userChatsData.chats[chatIndex].updateAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setVal("");
    }
  };
  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(firestore, "users", authUser.uid);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked
          ? arrayRemove(user.uid)
          : arrayUnion(user.uid),
      });
      changeBlock();
    } catch (error) {}
  };
  console.log(Date.now());
  console.log(chat);

  return (
    <div className="flex flex-col basis-2/3 border-x-2 h-full ">
      <div className="flex items-center gap-6 justify-center border-b-2 py-5">
        <Avatar size={"xl"} src={user?.profilePicURL} />
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{user?.username}</span>
          <p>{user?.bio || "No bio yet("}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 overflow-x-hidden overflow-y-visible">
        {chat?.messages?.map((message) => (
          <div
            className={
              message.senderId === authUser.uid ? myMessage : yourMessage
            }
            key={message?.createAt}
          >
            {/* <img
              className="w-12 h-12 rounded-full object-cover"
              src="../../../public/default-user.jpg"
              alt="userimg"
            /> */}
            <div className="flex-1 flex flex-col gap-1">
              <p className="p-5 bg-orange-300 rounded-lg">{message.val}</p>
              <p>{timeAgo(message.createAt.seconds * 1000)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 flex items-center justify-between mt-auto">
        <input
          className="flex basis-3/4 bg-red-200 border-none outline-none text-white p-5 rounded-2xl text-[16px]"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You Cannot send a message "
              : "Type a message"
          }
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />

        <div className="relative">
          <button onClick={() => setOpen((val) => !val)} className="w-[30px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M7.105 9.553a1 1 0 0 1 1.342-.448l2 1a1 1 0 0 1-.894 1.79l-2-1a1 1 0 0 1-.448-1.342zm8.448-.448-2 1a1 1 0 0 0 .894 1.79l2-1a1 1 0 1 0-.894-1.79zm-.328 5.263a4 4 0 0 1-6.45 0 1 1 0 0 0-1.55 1.264 6 6 0 0 0 9.55 0 1 1 0 1 0-1.55-1.264zM23 2v10a11 11 0 0 1-22 0V2a1 1 0 0 1 1.316-.949l4.229 1.41a10.914 10.914 0 0 1 10.91 0l4.229-1.41A1 1 0 0 1 23 2zm-2 10a9 9 0 1 0-9 9 9.029 9.029 0 0 0 9-9z" />
            </svg>
          </button>
          <div className="absolute bottom-12 right-0">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are blocked"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
      </div>
    </div>
  );
};
export default Chat;
