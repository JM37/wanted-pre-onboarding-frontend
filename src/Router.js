import React, { PureComponent } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";

class Router extends PureComponent {
  render() {
    return (
      <BrowserRouter basename={""}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/todo/*" element={<Todo />}></Route>
          <Route path="/product/*" element={<Main />}></Route>
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="*" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Router;
