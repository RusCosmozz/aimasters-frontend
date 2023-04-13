import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  & > input {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }

  & > button {
    &:not(:first-child) {
      margin-top: 16px;
    }
  }
`;

export default Form;