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


const LoginFormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
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
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
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
          <Input
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
      </Form>
      <GoogleAuth>Sign in with Google</GoogleAuth>
    </LoginFormContainer>
  );
};

export default LoginForm;
