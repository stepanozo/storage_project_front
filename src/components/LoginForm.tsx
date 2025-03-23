import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import React from "react";
import {doLogin} from "../api/userApi";
import {LoginDTO} from "../api/LoginDTO";

export const LoginForm =() => {
  const handleLoginClick = (loginDTO: LoginDTO) => {
    doLogin(loginDTO).then(data => {
      localStorage.setItem("token", data)
      console.log("token : " + localStorage.getItem('token'))
      console.log("data : " + data)
    })
  }

  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label="Введите логин"
        className="mb-3"
      >
        <Form.Control/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Введите пароль">
        <Form.Control type="password"/>
      </FloatingLabel>

      <Button style={{minWidth: "100px"}} variant="primary" className= "ms-1 mt-1"
      onClick={() => handleLoginClick({login: "TheGreatAdmin", passwordHash: "adminpassword"})
      }>
        Войти
      </Button>
      <Button style={{minWidth: "100px"}} variant="primary" className= "ms-2 mt-1" >
        Регистрация
      </Button>
    </>
  );
}

