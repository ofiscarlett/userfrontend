
import Sidebar from "../components/sidebar";
import {Link} from "react-router-dom";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import Register from "./Register";

const Home = () => {
    return (
        <Container className="home">
            <Row className="mt-10">
                <Col xs={4} className="sidebar mr-7">
                    <Sidebar />
                </Col>
                <Col xs={8}>
                    <div className="home">
                        <h1>Home Page</h1>
                        <Link to ="/register">Register</Link>
                        <Link to ="/signin">Sign in</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;