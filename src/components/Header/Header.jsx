import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import AccountDropdown from '../Account/AccountDropdown';
import './Header.scss';

export default function Header() {
    return (
        <Navbar
            bg="info"
            className="border-bottom header"
            expand="md"
            sticky="top"
            variant="dark"
        >
            <Navbar.Brand className="text-white" href="#home">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="header" />
            <Navbar.Collapse id="header">
                <Nav className="mr-auto">
                    <Nav.Link className="text-light" href="#home">Home</Nav.Link>
                    <Nav.Link className="text-light" href="#features">Features</Nav.Link>
                    <Nav.Link className="text-light" href="#pricing">Pricing</Nav.Link>
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
                <AccountDropdown className="my-2 my-md-0"/>
            </Navbar.Collapse>
        </Navbar>
    );
}
