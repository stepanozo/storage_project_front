import {Button, Nav, Navbar} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import React from "react";

export const NaviBar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="ms-2">НаСкладе</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav variant="underline" className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/equipment" className="nav-link">
              ТМЦ
            </NavLink>
            <NavLink to="/request" className="nav-link">
              Заявки
            </NavLink>
          </Nav>
          <Nav className="ms-auto">
            <Button variant="primary" className="me-2">Войти</Button>
            <Button variant="primary" className="me-2">Выйти</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </>
  );
};
