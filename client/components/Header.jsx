import React, {Component} from 'react';
import NavLink from 'react-router-dom/es/NavLink';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';

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
            <Navbar color='faded' light expand='md'>
                <NavbarBrand href='/'>Trial</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <NavLink to='/' exact activeClassName='active'>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to='/Counter' exact activeClassName='active'>Counter</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>

        );
    }
}
