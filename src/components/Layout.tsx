import React from "react";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";

import { Header } from "./Header";

export const Layout: React.FC = () => (
  <div>
    <Header />
    <main role="main">
      <Container className="pt-4">
        <Outlet />
      </Container>
    </main>
  </div>
);
