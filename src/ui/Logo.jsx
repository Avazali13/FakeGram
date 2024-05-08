import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
`;

const Img = styled.img`
height: 9.8rem;
border-radius: 100%;
  width: 10rem;
object-fit: 'contain';
  @media only screen and (min-width: 768px) {
    /* height: 9.6rem; */

  }
`;

function Logo() {
  return (
    <StyledLogo>
    <NavLink to="/">
    <Img src="https://i.ibb.co/6HWmHf9/IMG-6933.jpg" alt="IMG-6933" border="0" />
    </NavLink>
      {/* <Img src="../assets/IMG_6933.jpeg" alt="Logo" /> */}
    </StyledLogo>
  );
}

export default Logo;
