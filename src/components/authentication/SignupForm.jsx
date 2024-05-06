/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { NavLink } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import useSignUpWithEmail from "../../hooks/useSignUpWithEmail";
import Form from "../../ui/Form";

const FormContainer = styled.div`
  @media only screen and (min-width: 768px) {
    padding: 20px;

    min-width: 420px;
  }

  min-width: 100%;

  margin: auto;
  /* padding: 20px; */
  border-radius: 2rem;

  /* border: 1px solid #ccc; */
  border-radius: 8px;
  /* background-color: #ffffff;
   */
  /* background: -webkit-linear-gradient(left, #a445b2, #fa4299); */
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
`;

const StyledButton2 = styled(Button)`
  width: 100%;
  margin-top: 20px;
  background: -webkit-linear-gradient(
    right,
    #a445b2,
    #fa4299,
    #a445b2,
    #fa4299
  );
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const Title = styled.div`
  @media only screen and (min-width: 768px) {
    font-size: 35px;
  }
  font-size: 22px;

  font-weight: 600;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

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

const SignupForm = () => {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { loading, signup } = useSignUpWithEmail();

  const onSubmit = ({ fullName, email, password, userName }) => {
    signup(
      { fullName, userName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="title-text">
          <Title className="title login">Signup Form</Title>
        </div>
        <FormRow error={errors?.fullName?.message}>
          <StyledInput
            type="text"
            id="fullName"
            disabled={loading}
            {...register("fullName", { required: "This field is required" })}
            placeholder="Full Name"
          />
        </FormRow>

        <FormRow error={errors?.userName?.message}>
          <StyledInput
            type="text"
            id="userName"
            disabled={loading}
            {...register("userName", { required: "This field is required" })}
            placeholder="User Name"
          />
        </FormRow>

        <FormRow error={errors?.email?.message}>
          <StyledInput
            type="email"
            id="email"
            placeholder="Email Address"
            disabled={loading}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
                
              },
              onChange: (e) => e.target.value.toLowerCase()
            })}
            
          />
        </FormRow>


        <FormRow error={errors?.password?.message}>
          <StyledInput
            type="password"
            placeholder="Password (Min 8 characters)"
            id="password"
            disabled={loading}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            
            })}
          />
        </FormRow>

        <FormRow error={errors?.passwordConfirm?.message}>
          <StyledInput
            placeholder="Repeat Password"
            type="password"
            id="passwordConfirm"
            disabled={loading}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />
        </FormRow>

        <StyledLink to="/login">
          <StyledButton
            type="reset"
            variation="secondary"
            disabled={loading}
            onClick={reset}
          >
            Cancel
          </StyledButton>
        </StyledLink>
        {/* <StyledButton
          type="reset"
          variation="secondary"
          disabled={loading}
          onClick={reset}
        >
          <StyledLink to="/login">Cancel</StyledLink>
        </StyledButton> */}
        <StyledButton2 type="submit" disabled={loading}>
          {loading ? "Creating new user..." : "Create new user"}
        </StyledButton2>
        <div className="mt-4">
          <GoogleAuth>Sign up with Google</GoogleAuth>
        </div>
      </Form>
    </FormContainer>
  );
};

export default SignupForm;
