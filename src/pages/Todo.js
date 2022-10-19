import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TodoLabel from "../components/TodoLabel";
import Button from "../components/Button";

import styles from "../css/Todo.module.css";

function Todo() {
  const navigate = useNavigate();
  const [addTodo, setAddTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoListState, setTodoListState] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const options = {
      url: "https://pre-onboarding-selection-task.shop/todos",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios(options)
      .then((response) => {
        const listState = [{ id: "", state: "" }];
        for (let i = 0; i < response.data.length; i++) {
          listState.push({ id: response.data[i].id, state: true });
        }
        setTodoList(response.data);
        setTodoListState(listState);
      })
      .catch((e) => {
        console.log("E", e);
      });
  }, [refresh]);

  const handleClick = (e, cmd, data) => {
    console.log("click ", cmd);

    if (e && e.preventDefault) e.preventDefault();
    if (cmd === "add") {
      console.log("add todo");
      const options = {
        url: "https://pre-onboarding-selection-task.shop/todos",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "Application/json",
        },
        data: JSON.stringify({ todo: addTodo }),
      };
      axios(options)
        .then((response) => {
          setAddTodo("");
          setRefresh(!refresh);
        })
        .catch((res) => {
          console.log("E", res);
        });
    } else if (cmd === "isCompleted") {
      const options = {
        url: `https://pre-onboarding-selection-task.shop/todos/${data}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "Application/json",
        },
        data: JSON.stringify({
          todo: todoList.find((id) => id.id === data).todo,
          isCompleted: !todoList.find((id) => id.id === data).isCompleted,
        }),
      };
      axios(options)
        .then((response) => {
          setRefresh(!refresh);
        })
        .catch((res) => {
          console.log("E", res);
        });
    } else if (cmd === "edit") {
      if (todoListState.find((id) => id.id === data).state) {
        setTodoListState(
          todoListState.map((id) =>
            id.id === data ? { ...id, id: data, state: false } : id
          )
        );
      } else {
        const options = {
          url: `https://pre-onboarding-selection-task.shop/todos/${data}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "Application/json",
          },
          data: JSON.stringify({
            todo: document.getElementById(data).value,
            isCompleted: todoList.find((id) => id.id === data).isCompleted,
          }),
        };
        axios(options)
          .then((response) => {
            setRefresh(!refresh);
          })
          .catch((res) => {
            console.log("E", res);
          });
      }
    } else if (cmd === "delete") {
      const options = {
        url: `https://pre-onboarding-selection-task.shop/todos/${data}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      axios(options)
        .then((response) => {
          setRefresh(!refresh);
        })
        .catch((e) => {
          console.log("E", e);
        });
    } else {
      console.error("unknown cmd is ", cmd);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.todo_container}>
        <div className={styles.todo_header}>
          <h2>Todo List</h2>
        </div>
        <div className={styles.todo_body}>
          <div className={styles.add_todo_box}>
            <input
              className={styles.add_todo}
              onChange={(e) => setAddTodo(e.target.value)}
              value={addTodo}
            />
            <button
              className={styles.add_button}
              onClick={(e) => handleClick(e, "add")}
            >
              추가
            </button>
          </div>
          <div className={styles.todo_list_label_box}>
            <label>완료여부를 설정하시려면 리스트를 클릭해 주세요.</label>
          </div>
          <div className={styles.todo_list_container}>
            {todoList.map(({ id, todo, isCompleted }, index) => {
              return (
                <div className={styles.todo_list_box} key={index}>
                  <label>{`${index + 1}.`}</label>
                  <div className={styles.label_box}>
                    <TodoLabel
                      id={id}
                      state={todoListState[index + 1].state}
                      isCompleted={isCompleted}
                      onClick={(e) => handleClick(e, "isCompleted", id)}
                    >
                      {todo}
                    </TodoLabel>
                  </div>
                  <div className={styles.button_box}>
                    <Button
                      type="edit"
                      state={todoListState[index + 1].state}
                      onClick={(e) => handleClick(e, "edit", id)}
                    />
                    <Button
                      type="delete"
                      onClick={(e) => handleClick(e, "delete", id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
