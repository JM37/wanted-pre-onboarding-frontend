import React from "react";
import styled from "styled-components";

const StyledButtonTop = styled.button`
  width: 60%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 25px;
  color: #fff;
  background-color: #97897b;

  &:hover,
  &:focus {
    background: var(--button-hover-bg-color, #554f48);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, #c8dede);
  }
`;

const StyledButtonBottom = styled.button`
  width: 60%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 17px;
  color: #fff;
  background-color: #72695c;

  &:hover,
  &:focus {
    background: var(--button-hover-bg-color, #554f48);
  }
`;

const StyledButtonEdit = styled.button`
  width: 60%;
  min-width: 50px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 17px;
  color: #fff;
  background-color: #0d6efd;

  &:hover,
  &:focus {
    background: var(--button-hover-bg-color, #025ce2);
  }
`;

const StyledButtonDelete = styled.button`
  width: 60%;
  min-width: 50px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 17px;
  color: #fff;
  background-color: #dc3545;

  &:hover,
  &:focus {
    background: var(--button-hover-bg-color, #c82333);
  }
`;

function Button(props) {
  return (
    <>
      {props.type === "top" ? (
        <StyledButtonTop disabled={props.disabled} onClick={props.onClick}>
          {props.children}
        </StyledButtonTop>
      ) : props.type === "bottom" ? (
        <StyledButtonBottom onClick={props.onClick}>
          {props.children}
        </StyledButtonBottom>
      ) : props.type === "edit" ? (
        <StyledButtonEdit onClick={props.onClick} state={props.state}>
          {props.state ? "수정" : "확인"}
        </StyledButtonEdit>
      ) : (
        <StyledButtonDelete onClick={props.onClick}>
          {props.children}
        </StyledButtonDelete>
      )}
    </>
  );
}

export default Button;
