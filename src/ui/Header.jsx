import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../pages/authentication/UserAvatar";
import Avatar from "./Avatar";


const StyledHeader = styled.header`
  background-color: var(--color-grey-200);
  padding: 1.2rem 4.8rem;
  /* border-bottom: 1px solid var(--color-grey-100); */

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  /* background-image: linear-gradient(to right bottom, #87ceeb, #8cc1f9, #afaef9, #dc95e1, #fc7cb3, #ff7b8f, #ff856a, #fb9648, #edb342, #d8cf4e, #bce86c, #98ff98); */
`;

function Header() {
  return (
    <StyledHeader>
    <HeaderMenu/>
    </StyledHeader>
  );
}

export default Header;
