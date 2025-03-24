import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import React, {useState} from "react";
import {doLogin} from "../api/userApi";
import {LoginDTO} from "../api/LoginDTO";
import {useNavigate} from "react-router-dom";
import UserAuthDTO from "../api/UserAuthDTO";

export const LoginForm =() => {

  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [currentLogin, setCurrentLogin] = useState<string>('')
  const navigate = useNavigate();


  const handleLoginClick = (loginDTO: LoginDTO) => {
    doLogin(loginDTO).then(data => {
      const userAuth = new UserAuthDTO(data.id, data.login, data.fullName, data.role, data.token);
      localStorage.setItem("token", userAuth.token)
      localStorage.setItem("userId", userAuth.id.toString());
      localStorage.setItem("login", userAuth.login)
      localStorage.setItem("role", userAuth.role)
      localStorage.setItem("fullName", userAuth.fullName)
      navigate('/request')
    })
  }

  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label="Введите логин"
        className="mb-3"
      >
        <Form.Control onChange={e => setCurrentLogin(e.target.value)}/>
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Введите пароль">
        <Form.Control type="password"
                      onChange={e => setCurrentPassword(e.target.value)}/>
      </FloatingLabel>

      <Button style={{minWidth: "100px"}} variant="primary" className= "ms-1 mt-1"
      onClick={() => handleLoginClick({login: currentLogin, passwordHash: currentPassword})
      }>
        Войти
      </Button>
      <Button style={{minWidth: "100px"}} variant="primary" className= "ms-2 mt-1" >
        Регистрация
      </Button>
    </>
  );
}

