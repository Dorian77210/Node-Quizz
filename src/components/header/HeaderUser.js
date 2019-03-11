import React from 'react';
import { NavLink } from 'react-router-dom';

class HeaderUser extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {

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