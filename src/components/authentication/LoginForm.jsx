// import { useState } from "react";
// import Button from "../../ui/Button";
// import Form from "../../ui/Form";
// import Input from "../../ui/Input";
// import FormRowVertical from "../../ui/FormRowVertical";
// import SpinnerMini from "../../ui/SpinnerMini";

// import GoogleAuth from "./GoogleAuth";
// import useLogin from "../../hooks/useLogin";

// function LoginForm() {
//   const [isLogin, setIsLogin] = useState(true);

//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//   });

//   const { login, loading } = useLogin();

//   function handleSubmit(e) {
//     e.preventDefault();
//     login(inputs.email, inputs.password, {
//       onSettled: () => {
//         setInputs({ ...inputs, email: "", password: "" });
//       },
//     });

//     // navigate("/dashboard");
//   }

//   return (
//     <Form onSubmit={handleSubmit} >
//       <FormRowVertical label="Email address">
//         <Input
//           type="email"
//           id="email"
//           // This makes this form better for password managers
//           autoComplete="username"
//           value={inputs.email}
//           onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//           disabled={loading}
//         />
//       </FormRowVertical>

//       <FormRowVertical label="Password">
//         <Input
//           type="password"
//           id="password"
//           autoComplete="current-password"
//           value={inputs.password}
//           onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
//           disabled={loading}
//         />
//       </FormRowVertical>
//       <FormRowVertical>
//         <Button size="large" disabled={loading}>
//           {!loading ? "Log in" : <SpinnerMini />}
//         </Button>
//       </FormRowVertical>
//       <FormRowVertical>
//         <GoogleAuth >
//          Sign in
//         </GoogleAuth>
//       </FormRowVertical>
//     </Form>
//   );
// }

// export default LoginForm;

//^

import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import GoogleAuth from "./GoogleAuth";
import useLogin from "../../hooks/useLogin";
import { NavLink } from "react-router-dom";

// Styled components for the login form
const LoginFormContainer = styled.div`
  /* min-width: 390px; */
  background: #fff;
  min-height: 500px;
  padding: 20px;
  padding-top: 6rem;
  border-radius: 2rem;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
  margin: auto;
`;

const StyledButton = styled(Button)`
  height: 50px;
  width: 100%;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  margin-top: 20px;
  background: -webkit-linear-gradient(right, #0300ab, #3827ff);
`;

// Apply the CSS styling to your form elements
const StyledInput = styled(Input)`
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  font-size: 17px;
  transition: all 0.3s ease;
  &:focus {
    border-color: #0300AB;
  }
`;

const Title = styled.div`
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputs.email, inputs.password, {
      onSettled: () => {
        setInputs({ email: "", password: "" });
      },
    });
  };

  return (
    <LoginFormContainer>
      <div className="wrapper">
        <div className="title-text">
          <Title className="title login">Login Form</Title>
        </div>
        <Form onSubmit={handleSubmit} className="form-container">
          <div className="form-inner">
            <FormRowVertical>
              <StyledInput
                placeholder="Email Address"
                id="email"
                autoComplete="username"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    email: e.target.value.trim().toLowerCase(),
                  })
                }
                disabled={loading}
                // required
              />
            </FormRowVertical>

            <FormRowVertical>
              <StyledInput
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                disabled={loading}
                // required
              />
            </FormRowVertical>

            <StyledButton size="large" type="submit" disabled={loading}>
              {!loading ? "Log in" : <SpinnerMini />}
            </StyledButton>
            <div className="signup-link flex mt-7 justify-center text-[1.6rem]">
              <p className="ml-3"> Not a member?</p>
              <p className="ml-4">
                {" "}
                <NavLink style={{ color: "#000" ,fontWeight:'bold'}} to="/signup">
                  {" "}
                  Signup now
                </NavLink>
              </p>
            </div>
          </div>
        </Form>
        <GoogleAuth>Sign in with Google</GoogleAuth>
      </div>
    </LoginFormContainer>
  );
};

export default LoginForm;

// <NavLink>Signup now</NavLink>;
