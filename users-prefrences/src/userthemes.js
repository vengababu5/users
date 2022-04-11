import { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav'


const UserThemes = () => {
    const [themes, setThemes] = useState([
        { userName: '', themeColor: 'light' },
        { userName: '', themeColor: 'primary' },
        { userName: '', themeColor: 'dark' },
    ]);
    const [defaultTheme, setDefalutTheme] = useState('light');


    useEffect(() => {

    }, []);
    const themeHandlerChange = (event) => {
        setDefalutTheme(event.target.innerHTML)
        console.log(defaultTheme);
    }

    return (

        <>

            <Navbar bg={defaultTheme} expand="lg">
                <Container>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <NavDropdown title="Menu" className="nav-text">

                                {themes.map(val => {
                                    return (
                                        <>
                                            <NavDropdown.Item eventKey={val.UserThemes} onClick={themeHandlerChange}>{val.themeColor}</NavDropdown.Item>
                                        </>
                                    )
                                })}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}
export default UserThemes;