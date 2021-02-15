import React from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className="nav-link dropdown-toggle"
    href=""
    style={{ fontSize: "30px" }}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

export default function NavBarPk(props) {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="sm">
      <Navbar.Brand href="/">
        <Image
          src="/assets/img/navbar/logo-mini.png"
          height={50}
          width={118}
          alt="Home"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Item>
            <a href="/battle" className="btn btn-outline-primary btn-block">
              <div className="d-flex align-content-center">
                <Image
                  src="/assets/img/navbar/go-battle.png"
                  height={30}
                  width={149}
                />
              </div>
            </a>
          </Nav.Item>
        </Nav>
        <Nav className="ml-auto">
          <Form inline>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search"
                style={{ height: "51px" }}
                className=""
              />
              <InputGroup.Append>
                <Button variant="light">
                  <div className="d-flex align-content-center">
                    <Image
                      src="/assets/img/navbar/pokesearch.png"
                      height={30}
                      width={30}
                      alt="Search"
                    />
                  </div>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <Dropdown title="" id="basic-nav-dropdown">
            <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>

            <Dropdown.Menu alignRight>
              <Dropdown.Item href="/pokedex">Pokedex</Dropdown.Item>
              <Dropdown.Item href="/movedex">Movedex</Dropdown.Item>
              <Dropdown.Item href="/typedex">Typedex</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#action/3.4">Sign Up</Dropdown.Item>
              <Dropdown.Item href="#action/3.4">Log In</Dropdown.Item>
              <Dropdown.Item href="#action/3.4">Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
