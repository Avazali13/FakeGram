import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";


import GoogleAuth from "./GoogleAuth";
import useLogin from "../../hooks/useLogin";


function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    login(inputs.email, inputs.password, {
      onSettled: () => {
        setInputs({ ...inputs, email: "", password: "" });
      },
    });

    // navigate("/dashboard");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          disabled={loading}
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
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={loading}>
          {!loading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <FormRowVertical>
        <GoogleAuth >
         Sign in
        </GoogleAuth>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
