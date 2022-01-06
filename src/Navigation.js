import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import productListStore from './store/productList';
import {observer} from 'mobx-react-lite';

function Navigation(){
    
    productListStore.load();

    let links = productListStore.lists.map((pl) => (
            <Nav.Link key={pl.id} as={Link} to={"/list/" + pl.id}>{pl.name}</Nav.Link>
       ));
    
    return (
        <>
            <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            {links}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default observer(Navigation);