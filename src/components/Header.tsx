import React from "react";
import { Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

import { Search } from "./Search";

export const Header: React.FC = () => {
  const navigateTo = useNavigate();
  const navigateToHome = () => navigateTo("/");
  const navigateToFavorite = () => navigateTo("/favorites");

  return (
    <header>
      <Navbar bg="dark" variant="dark" sticky="top" expand="md">
        <Container fluid>
          <Navbar.Brand href="#" onClick={navigateToHome}>
            Star Wars Explorer
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarExtra" />
          <Navbar.Collapse id="navbarExtra">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link className="me-4" onClick={navigateToFavorite}>
                Favorites
              </Nav.Link>
              <Search />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
