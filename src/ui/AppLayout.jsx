import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import styled from "styled-components";

const Main = styled.main`
  background-color: #fff;
  /* padding: 4rem 4.8rem 6.4rem; */
  overflow: scroll;
  /* overflow-x: hidden; */
  overflow-x: hidden;
  overflow-y: unset;
  border-radius: 2rem;
  /* background-image: linear-gradient(to right bottom, #e0e0e0, #e0e0e6, #dee1ec, #dae2f2, #d5e3f8, #cde7fd, #c5ecff, #bdf1ff, #bcf9f6, #c9fee7, #e1ffd7, #ffffcc); */

  scrollbar-color: var(--color-brand-500);
  @media only screen and (min-width: 768px) {
    padding: 1rem 4.8rem 6.4rem;
  }
`;

const StyledAppLayout = styled.div`
  /* background-color: var(--color-grey-200); */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;

  /* overflow-x: hidden; */

  @media only screen and (min-width: 768px) {
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
  }
`;

// const StyledAppLayout = styled.div`
// display: flex;
// flex-direction: column;
// `;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

`;

function AppLayout() {
  return (
    <>
      <Header />
      <StyledAppLayout>
        <div className="sticky top-0 z-10 md:relative">
          <SideBar />
        </div>
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
