import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import "./NavigationBar.css";
import swal from 'sweetalert';

class NavigationBar extends React.Component {

    render() {
        if(!navigator.onLine) {
            swal({
                title: "You are offline",
                text: "Displayed data may be out of date",
                icon: "warning",
                closeOnClickOutside: true
            });
        }
        return (
            <Navbar expand="lg">
                <Navbar.Brand>Notice board</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/">Home</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/notices">Notices</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;
