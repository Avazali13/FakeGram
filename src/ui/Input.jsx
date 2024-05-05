import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.6rem 0.6rem;
  box-shadow: var(--shadow-sm);

  @media only screen and (min-width: 768px) {
    padding: 0.8rem 1.2rem;
  }
`;

export default Input;
