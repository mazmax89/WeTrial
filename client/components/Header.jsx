import React, {Component} from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav} from 'reactstrap';
import './HeaderStyle.scss';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <header>
                <Navbar expand='md'>
                    <NavbarBrand href='/'>Trial</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavLink to='/' exact activeClassName='active'>Home</NavLink>
                            <NavLink to='/signup' exact activeClassName='active'>Sign up!!!!!</NavLink>
                            <NavLink to='/counter' exact activeClassName='active'>Counter</NavLink>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
