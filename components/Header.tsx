import Link from "next/link";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import * as styles from "../styles/header.module.scss";
import AccountDropdown from "../components/Account/Dropdown";

export default function Header() {
  return (
    <Navbar
      bg="info"
      className={styles["header-height"]}
      expand="md"
      sticky="top"
      variant="dark"
    >
      <Link href="/">
        <Navbar.Brand
          className={`${styles["header-brand"]} "text-white"`}
          style={{ fontWeight: "bold" }}
        >
          Bountiful Finance
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="header" />
      <Navbar.Collapse id="header">
        <Nav className="mr-auto">
          {/* <Nav.Link className="text-light" href="#home">Home</Nav.Link>
                    <Nav.Link className="text-light" href="#features">Features</Nav.Link>
                    <Nav.Link className="text-light" href="#pricing">Pricing</Nav.Link> */}
        </Nav>
        <Form inline>
          <FormControl
            aria-label="Search"
            className="my-sm-0 my-2"
            placeholder="Search"
            type="text"
          />
          <Button variant="outline-light  mx-md-2 ml-sm-2">Search</Button>
        </Form>
        <AccountDropdown className="my-2 my-md-0" />
      </Navbar.Collapse>
    </Navbar>
  );
}
