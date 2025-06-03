import {Badge, Button, Nav, Navbar} from "react-bootstrap";
import {Link, NavLink} from 'react-router-dom';
import React from "react";

export const NaviBar = () => {

  const handleLogOut=  () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    localStorage.removeItem("fullName");
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="ms-2">НаСкладе</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav variant="underline" className="me-auto">

            {(localStorage.getItem("role") === 'admin' ||
              localStorage.getItem("role") === 'storekeeper'
              ) ?
                <NavLink to="/equipment" className="nav-link">
                ТМЦ
                </NavLink>
              : null
            }

            <NavLink to="/request" className="nav-link">
              Заявки
            </NavLink>

            {(localStorage.getItem("role") === 'admin') ?
                <NavLink to="/status_log" className="nav-link">
                  Лог
                </NavLink>
                : null
            }

            {(localStorage.getItem("role") === 'admin') ?
                <NavLink to="/statistics" className="nav-link">
                  Статистика
                </NavLink>
                : null
            }


          </Nav>


          <Nav className="ms-auto">
            {localStorage.getItem("login") !== null ?
              <>
                <h4>
                  <Badge bg="secondary" className="me-2">{localStorage.getItem("login")}</Badge>
                </h4>
                <Link to = "/login">
                  <Button variant="primary" className="me-2" onClick={() => handleLogOut()}>
                    Выйти
                  </Button>
                </Link>
              </>
            :
              <>
                <Link to = "/login">
                  <Button variant="primary" className="me-2">
                  Войти
                </Button>
                </Link>
                <Link to = "/register">
                  <Button variant="primary" className="me-2">
                    Регистрация
                  </Button>
                </Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </>
  );
};
