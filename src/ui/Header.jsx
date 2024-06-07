import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
// import Logo from "./Logo";



const StyledHeader = styled.header`
  /* background-color: var(--color-grey-50); */
  /* padding: 1.2rem 4.8rem; */
  height: 11.5rem;
  padding: 0px 4.8rem;
  /* border-bottom: 1px solid var(--color-grey-100); */
border-bottom: 1px solid #c7d2fe;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (min-width: 768px) {
    justify-content: space-between;

  }
  /* background-image: linear-gradient(to right bottom, #87ceeb, #8cc1f9, #afaef9, #dc95e1, #fc7cb3, #ff7b8f, #ff856a, #fb9648, #edb342, #d8cf4e, #bce86c, #98ff98); */
`;

function Header() {
  return (
    <StyledHeader>
    {/* <Logo/> */}
    <HeaderMenu/>
    </StyledHeader>
  );
}

export default Header;
