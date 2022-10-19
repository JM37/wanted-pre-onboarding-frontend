import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";

import styles from "../css/SignUp.module.css";

function SignUp() {
  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwCheck, setUserPwCheck] = useState("");
  const [emailState, setEmailState] = useState(true);
  const [pwState, setPwState] = useState(true);
  const [pwCheckState, setPwCheckState] = useState(true);
  const [signUpState, setSignUpState] = useState(false);
  const isMountedEmail = useRef(false);
  const isMountedPw = useRef(false);
  const isMountedPwCheck = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMountedEmail.current) {
      setEmailState(regutil(userEmail));
    } else {
      isMountedEmail.current = true;
    }
  }, [userEmail]);

  useEffect(() => {
    if (isMountedPw.current) {
      if (userPw.length < 8) {
        setPwState(false);
      } else {
        setPwState(true);
      }
    } else {
      isMountedPw.current = true;
    }
  }, [userPw]);

  useEffect(() => {
    if (isMountedPwCheck.current) {
      if (userPw === userPwCheck) {
        setPwCheckState(true);
      } else {
        setPwCheckState(false);
      }
    } else {
      isMountedPwCheck.current = true;
    }
  }, [userPwCheck]);

  useEffect(() => {
    if (
      userEmail !== "" &&
      userPw !== "" &&
      userPwCheck !== "" &&
      emailState &&
      pwState &&
      pwCheckState
    ) {
      setSignUpState(true);
    } else {
      setSignUpState(false);
    }
  }, [emailState, pwState, pwCheckState]);

  const handleClick = (e, cmd) => {
    console.log("click ", cmd);
    if (e && e.preventDefault) e.preventDefault();
    if (cmd === "sign_up") {
      if (signUpState) {
        const options = {
          url: "https://pre-onboarding-selection-task.shop/auth/signup",
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
            navigate("/");
            console.log(res);
          })
          .catch((res) => alert(res.response.data.message));
      } else {
        alert("가입정보를 다시 확인해 주세요.");
      }
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
      <div className={styles.signup_container}>
        <div className={styles.signup_box_} top>
          <label className={styles.signup_text}>회원가입</label>
        </div>
        <div className={styles.signup_box_middle}>
          <input
            id="email"
            type="email"
            className={styles.input_id}
            placeholder="이메일."
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
            placeholder="비밀번호."
            minLength="8"
            onChange={(e) => setUserPw(e.target.value)}
          />
          {!pwState && (
            <label className={styles.input_id_text_style}>
              비밀번호는 8자 이상 입력해주세요.
            </label>
          )}
          <input
            id="check_pw"
            type="password"
            className={styles.input_ps}
            placeholder="비밀번호 재확인."
            onChange={(e) => setUserPwCheck(e.target.value)}
          />
          {!pwCheckState && (
            <label className={styles.input_id_text_style}>
              비밀번호가 일치하지 않습니다.
            </label>
          )}
        </div>
        <div className={styles.signup_box_bottom}>
          <Button
            type="top"
            disabled={!signUpState}
            className={styles.signup_btn}
            onClick={(e) => handleClick(e, "sign_up")}
          >
            가입하기
          </Button>
          <Button
            type="bottom"
            className={styles.cancle_btn}
            onClick={(e) => navigate(`/`)}
          >
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
