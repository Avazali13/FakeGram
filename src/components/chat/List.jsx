//^ main
// import UserInfo from "./UserInfo";
// import ChatList from "./ChatList";
// import styled from "styled-components";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   padding: 20px;
// `;

// const List = () => {
//   return (
//     <Container>
//       <UserInfo />
//       <ChatList />
//     </Container>
//   );
// };

// export default List;


import UserInfo from "./UserInfo";
import ChatList from "./ChatList";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-direction: row; */
  flex: 1;
  padding: 20px;
`;

const List = () => {
  return (
    <Container>
      <UserInfo />
      <ChatList />
    </Container>
  );
};

export default List;
