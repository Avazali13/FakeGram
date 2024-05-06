import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  /* background-color: var(--color-grey-50);   */
  height: calc(100vh - 8.5rem);
  /* padding: 3.2rem 2.4rem; */
  /* padding: 0rem 0rem; */
  /* border-right: 1px solid var(--color-grey-100); */
  border-right: 1px solid #c7d2fe;
  /* background-color: var(--color-grey-50); */

  /* grid-row: 1/-1; */
  display: flex;
  position: sticky;
  /* top: 0; */

  flex-direction: column;
  @media only screen and (min-width: 768px) {
    gap: 3.2rem;
    padding: 3.2rem 2.4rem;
  }
  gap: 1.2rem;
`;

function SideBar() {
  return (
    <StyledSidebar>
      {/* <Logo /> */}
      <MainNav />
    </StyledSidebar>
  );
}

export default SideBar;
