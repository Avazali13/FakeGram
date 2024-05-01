// import styled from "styled-components";
// import List from "./List";
// import Chat from "./Chat";
// import useAuthStore from "../../store/authStore";
// import { useChatStore } from "../../store/chatStore";

// const StyledDiv = styled.div`
//   width: 70vw;
//   height: 70vh;
//   background-color: #999223;
//   border-radius: 1.5rem;
//   backdrop-filter: blur(1.5rem) saturate(180%);
//   display:  flex;
// `;

// function Messages() {
//   const authUser=useAuthStore(state=>state.user)
//   const {chatId}=useChatStore()
//   return (
//     <StyledDiv>
//      <List />
//      {chatId && <Chat />}
//     </StyledDiv>
//   );
// }

// export default Messages;


//^main
// import styled from "styled-components";
// import List from "./List";
// import Chat from "./Chat";
// import useAuthStore from "../../store/authStore";
// import { useChatStore } from "../../store/chatStore";


// const MessagesContainer = styled.div`
//   display: flex;
//   /* width: 100vw; */
//   height: 100vh;
//   justify-content: center;
//   align-items: center;
//   background-color: #f0f0f0;
// `;

// const MessagesWrapper = styled.div`
//   display: flex;
//   /* flex-direction: column; */
//   width: 80%;

//   height: 80%;
//   max-width: 1200px;
//   max-height: 800px;
//   background-color: #fff;
//   border-radius: 20px;
//   /* overflow: hidden; */
//   box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
// `;

// const Messages = () => {
//   const authUser = useAuthStore((state) => state.user);
//   const { chatId } = useChatStore();

//   return (
//     <MessagesContainer>
//       <MessagesWrapper>
//         <List />
//         {chatId && <Chat />}
//       </MessagesWrapper>
//     </MessagesContainer>
//   );
// };

// export default Messages;



import styled from "styled-components";
import List from "./List";
import Chat from "./Chat";
import useAuthStore from "../../store/authStore";
import { useChatStore } from "../../store/chatStore";

const MessagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Adjusted alignment for better mobile view */
  background-color: #f0f0f0;
  padding: 20px; /* Added padding for better spacing */
`;

const MessagesWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  @media only screen and (max-width: 480px) {
flex-direction: column;
gap: 5rem;
}
  width: 100%; /* Adjusted width to fit full screen */
  max-width: 1200px;
`;

const Messages = () => {
  const authUser = useAuthStore((state) => state.user);
  const { chatId } = useChatStore();

  return (
    <MessagesContainer>
      <MessagesWrapper>
        <List />
        {chatId && <Chat />}
      </MessagesWrapper>
    </MessagesContainer>
  );
};

export default Messages;
