import React, { useState } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  width: 70%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  font-size: 15px;
`;

const StyledInput = styled.input`
  width: 70%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  border: none;
  font-size: 15px;
`;

function TodoLabel(props) {
  const [todo, setTodo] = useState(props.children);
  return (
    <>
      {props.state ? (
        <StyledLabel
          id={props.id}
          onClick={props.onClick}
          isCompleted={props.isCompleted}
          style={{
            textDecoration: props.isCompleted ? "line-through" : "none",
          }}
        >
          {props.children}
        </StyledLabel>
      ) : (
        <StyledInput
          id={props.id}
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
      )}
    </>
  );
}

export default TodoLabel;
