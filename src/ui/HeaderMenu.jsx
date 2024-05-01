import styled from "styled-components";
import { Avatar } from "@chakra-ui/react";

import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import Logout from "../pages/authentication/Logout";
// import Avatar from "./Avatar";
import useAuthStore from "../store/authStore";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

function HeaderMenu() {
  const authUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <NavLink to={`${authUser.username}`}>
        <ButtonIcon onClick={() => navigate("/:username")}>
          {<Avatar size={'xl'} src={authUser.profilePicURL} /> || <HiOutlineUser />}
        </ButtonIcon>
      </NavLink>
      <li>{authUser.username}</li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
