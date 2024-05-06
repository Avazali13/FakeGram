/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LoginForm from "../components/authentication/LoginForm";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  /* grid-template-columns: 48rem; */
  align-content: center;
  justify-content: center;
  gap: 3.2rem;

  padding-bottom: 3rem;
  /* background-color: var(--color-grey-50); */
  background: -webkit-linear-gradient(right, #0300ab, #3827ff);
`;

function Login() {
  return (
    <LoginLayout>
      <LoginForm />
      <Heading as="h2">
        {/* <NavLink className='flex justify-center ' to="/signup">Create new Profile</NavLink>{" "} */}
      </Heading>
    </LoginLayout>
  );
}

export default Login;
