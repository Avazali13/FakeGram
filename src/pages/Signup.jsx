// import Form from "../ui/Form";
import styled from "styled-components";
import SignupForm from "./authentication/SignupForm";

const SignUpLayout = styled.main`
  min-height: 100vh;
  display: grid;
  /* grid-template-columns: 48rem; */
  align-content: flex-end;
  justify-content: center;
  gap: 3.2rem;

  padding-bottom: 3rem;
  /* background-color: var(--color-grey-50); */
  background: -webkit-linear-gradient(left, #a445b2, #fa4299);
  `


function Signup() {



  
  return (
    <SignUpLayout>
      {/* <Heading as="h4"> Qeydiyyat ele brat</Heading> */}
      {/* <Form> */}
      <SignupForm />
      {/* </Form> */}
    </SignUpLayout>
  );
}

export default Signup;
