import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";

import styles from "../css/Main.module.css";

function Main() {
  const [userEmail, setUserEmail] = useState();
  const [userPw, setUserPw] = useState();
  const [emailState, setEmailState] = useState(true);
  const isMounted = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todo");
    }
  }, [navigate]);

  useEffect(() => {
    if (isMounted.current) {
      setEmailState(regutil(userEmail));
    } else {
      isMounted.current = true;
    }
  }, [userEmail]);

  const handleClick = (e, cmd) => {
    console.log("click ", cmd);
    if (e && e.preventDefault) e.preventDefault();
    if (cmd === "login") {
      console.log("login");
      const options = {
        url: "https://pre-onboarding-selection-task.shop/auth/signin",
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        data: JSON.stringify({
          email: userEmail,
          password: userPw,
        }),
      };
      axios(options)
        .then((res) => {
          localStorage.setItem("token", res.data.access_token);
          navigate("/todo");
        })
        .catch((res) => {
          alert("회원정보를 확인해 주세요.");
          console.log("E", res);
        });
    } else if (cmd === "signUp") {
      navigate(`/signup`);
    } else {
      console.error("unknown cmd is ", cmd);
    }
  };

  const regutil = (data) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data)) return true;
    return false;
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.login_container}>
        <div className={styles.login_box_top}>
          <label className={styles.login_text}>로그인</label>
        </div>
        <div className={styles.login_box_middle}>
          <input
            id="email"
            type="email"
            className={styles.input_id}
            placeholder="이메일을 입력하세요."
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {!emailState && (
            <label className={styles.input_id_text_style}>
              잘못된 이메일 형식입니다.
            </label>
          )}
          <input
            id="pw"
            type="password"
            className={styles.input_ps}
            placeholder="비밀번호 입력하세요."
            onChange={(e) => setUserPw(e.target.value)}
          />
        </div>
        <div className={styles.login_box_bottom}>
          <Button
            type="top"
            className={styles.login_btn}
            onClick={(e) => handleClick(e, "login")}
          >
            로그인
          </Button>
          <Button
            type="bottom"
            className={styles.signUp_btn}
            onClick={(e) => handleClick(e, "signUp")}
          >
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Main;
