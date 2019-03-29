import React from 'react';
import { NavLink } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';

import ErrorModal from './../modal/ErrorModal';

import axios from 'axios';

const override = css`
display: block;
position: fixed;
z-index: 1031;
margin: 0 auto;
top: 40vh;
`;

class HeaderUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        axios.post('/users/logout')
             .then(res => {
                this.setState( { loading: false } )
             }) 
             .catch(error => {

             });
    }

    render() {
        const header = 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink 
                    to="/users/quizz" 
                    className="navbar-brand"
                    exact={true}
                    activeClassName="active-link"
                >Home</NavLink>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink
                            to="/users/quizz/create"
                            className="nav-link"
                            exact={true}
                            activeClassName="active-link"
                            >Create a quizz
                            </NavLink>
                        </li>

                        <li className="navbar-brand">
                            <NavLink 
                                to="/users/logout"
                                className="nav-link"
                                exact={true}
                                onClick={this.logout}
                            >Logout</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

        return (
            header
        );
    }
}

export default HeaderUser;