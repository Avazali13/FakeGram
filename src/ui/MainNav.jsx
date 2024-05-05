/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineHome, HiOutlineUsers } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TiMessage, TiUserAdd } from "react-icons/ti";
import { TbLogout2 } from "react-icons/tb";
import { GoBookmark } from "react-icons/go";
// import { IoCreate } from "react-icons/io5";

import useLogOut from "../hooks/useLogOut";
import Search from "../pages/Search";
import CreatePost from "../pages/CreatePost";
// import CreatePost from "../pages/CreatePost";

const NavList = styled.ul`
margin-left: 0.2rem;
  display: flex;
  /* justify-content: space-between; */
  /* gap: 2.3rem; */
  gap: 25px;
  padding-top: 2rem;
  /* padding-bottom: 2rem; */
  flex-wrap: wrap;

  background-color: #fff;
  @media only screen and (min-width: 768px) {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 0.8rem;
    align-items: flex-start;
  }
`;

export const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    margin: 0 auto;
    gap: 0.5rem;

    color: var(--color-grey-600);
    /* font-size: 3.9rem; */
    padding: 0rem 1rem;
    transition: all 0.3s;
    font-weight: 500;

    @media only screen and (min-width: 768px) {
      padding: 1.2rem 2.4rem;
      font-size: 1.6rem;
      padding-right: 0.4rem;
      gap: 1.2rem;
      margin: 0 0;
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  const { handleLogout, isLoggingout } = useLogOut();
  return (
    <nav className=" shadow-sky-300 shadow-md md:shadow-none ">
      <NavList>
        <StyledNavLink to="/dashboard">
          <HiOutlineHome />
          <span className="hidden md:block">Home</span>
        </StyledNavLink>
        <StyledNavLink to="/messages">
          <TiMessage />
          <span className="hidden md:block">Messages</span>
        </StyledNavLink>{" "}
        <StyledNavLink2 >
          <Search />
        </StyledNavLink2>
        <StyledNavLink2>
          <CreatePost />
        </StyledNavLink2>
        <StyledNavLink to="suggested">
          <HiOutlineUsers  />
          <span className="hidden md:block">Suggested Users</span>
        </StyledNavLink>{" "}
        {/* <StyledNavLink to="saved">
          <GoBookmark />
          <span className="hidden md:block">Bookmarks</span>
        </StyledNavLink>{" "} */}
        <StyledNavLink to="/login">
          <TbLogout2  className="hidden md:block"/>
          <button
            onClick={() => handleLogout()}
            disabled={isLoggingout}
            className="hidden md:block"
          >
            Logout
          </button>
        </StyledNavLink>
      </NavList>{" "}
    </nav>
  );
}

export default MainNav;

export const StyledNavLink2 = styled(NavLink)`
  display: flex;
  /* gap: 2.2rem; */

  &:link,
  &:hover,
  &:visited {
    display: flex;
    align-items: center;
    margin: 0 auto;
    gap: 0.5rem;

    color: var(--color-grey-600);
    padding: 0rem 1rem;

    /* font-size: 0.9rem; */
    transition: all 0.3s;
    font-weight: 500;
    /* background-color: blue ; */

    @media only screen and (min-width: 768px) {
      padding: 1.2rem 2.4rem;
      font-size: 1.6rem;
      padding-right: 0.4rem;
      gap: 1.2rem;
      margin: 0 0;
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:visited {
    color: var(--color-brand-600);

    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg
  /* &:active svg, */
  /* &.active:link svg, */
  /* &.active:visited svg  */
  {
    color: var(--color-brand-600);
  }
`;
