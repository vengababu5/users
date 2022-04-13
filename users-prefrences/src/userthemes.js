import { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav'


const UserThemes = () => {
    const [themes, setThemes] = useState([
        { userName: 'user1', themeColor: 'light' },
        { userName: 'user2', themeColor: 'primary' },
        { userName: 'user3', themeColor: 'dark' },
    ]);
    const [defaultTheme, setDefalutTheme] = useState('light');


    useEffect(() => {

    }, []);

    const postData = () => {
        const newArr = [...themes];
        let obj = {};
        newArr.filter(val => {
            if (val.themeColor === defaultTheme) {
                return val;
            }
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: newArr[0].userName, theme: newArr[0].themeColor })
        };
        fetch('https://locahost/8081/updateTheme', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }
    const themeHandlerChange = (event) => {
        setDefalutTheme(event.target.innerHTML)
        postData();
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