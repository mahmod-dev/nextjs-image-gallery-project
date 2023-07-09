"use client"

import Link from "next/link"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { usePathname } from "next/navigation"

export default function NavBar() {
    const pathName = usePathname()

    return (
        <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect >

            <Container>
                <Navbar.Brand as={Link} href="/"> welcome to Image Gallery</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav>
                        <Nav.Link as={Link} href="/static" active={pathName === "/static"}>static </Nav.Link>
                        <Nav.Link as={Link} href="/dynamic" active={pathName === "/dynamic"}>Dynamic </Nav.Link>
                        <Nav.Link as={Link} href="/isr" active={pathName === "/isr"}>Isr </Nav.Link>
                        <NavDropdown title="Topics" id="topic-dropdown">
                            <NavDropdown.Item as={Link} href="/topics/fitness">Fitness</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/swimming">Swimming</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/topics/coding">Coding</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} href="/search" active={pathName === "/search"}>Search</Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

