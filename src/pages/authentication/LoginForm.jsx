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
// import { useState } from "react";
// import styled from "styled-components";
// import Button from "../../ui/Button";
// import Form from "../../ui/Form";
// import Input from "../../ui/Input";
// import FormRowVertical from "../../ui/FormRowVertical";
// import SpinnerMini from "../../ui/SpinnerMini";
// import GoogleAuth from "./GoogleAuth";
// import useLogin from "../../hooks/useLogin";


// const LoginFormContainer = styled.div`
//   max-width: 400px;
//   margin: auto;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   background-color: #fff;
// `;

// const StyledButton = styled(Button)`
//   width: 100%;
//   margin-top: 20px;
// `;

// const LoginForm = () => {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//   });

//   const { login, loading } = useLogin();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(inputs.email, inputs.password, {
//       onSettled: () => {
//         setInputs({ email: "", password: "" });
//       },
//     });
//   };

//   return (
//     <LoginFormContainer>
//       <Form onSubmit={handleSubmit}>
//         <FormRowVertical label="Email address">
//           <Input
//             type="email"
//             id="email"
//             autoComplete="username"
//             value={inputs.email}
//             onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//             disabled={loading}
//             required
//           />
//         </FormRowVertical>

//         <FormRowVertical label="Password">
//           <Input
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={inputs.password}
//             onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
//             disabled={loading}
//             required
//           />
//         </FormRowVertical>

//         <StyledButton size="large" type="submit" disabled={loading}>
//           {!loading ? "Log in" : <SpinnerMini />}
//         </StyledButton>
//       </Form>
//       <GoogleAuth>Sign in with Google</GoogleAuth>
//     </LoginFormContainer>
//   );
// };

// export default LoginForm;


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
  max-width: 390px;
  background: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 15px 20px rgba(0,0,0,0.1);
  margin: auto;
`;

const StyledButton = styled(Button)`
  height: 50px;
  width: 100%;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  margin-top: 20px;
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
    border-color: #fc83bb;
  }
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
          <div className="title login">Login Form</div>
        </div>
        <Form onSubmit={handleSubmit} className="form-container">
          <div className="form-inner">
            <FormRowVertical label="Email Address">
              <StyledInput
                type="email"
                id="email"
                autoComplete="username"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                disabled={loading}
                required
              />
            </FormRowVertical>

            <FormRowVertical label="Password">
              <StyledInput
                type="password"
                id="password"
                autoComplete="current-password"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                disabled={loading}
                required
              />
            </FormRowVertical>

            <StyledButton size="large" type="submit" disabled={loading}>
              {!loading ? "Log in" : <SpinnerMini />}
            </StyledButton>
            <div className="signup-link pt-4">Not a member? <NavLink to='/signup'>Signup now</NavLink></div>
          </div>
        </Form>
        <GoogleAuth>Sign in with Google</GoogleAuth>
      </div>
    </LoginFormContainer>
  );
};

export default LoginForm;

<NavLink>Signup now</NavLink>