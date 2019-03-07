import React from 'react';
import { NavLink } from 'react-router-dom';

class HeaderHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const header = 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink 
                    to="/home" 
                    className="navbar-brand"
                    exact={true}
                    activeClassName="active-link"
                >Node Quizz !</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                            <NavLink
                            to="/users/signup"
                            className="nav-link"
                            exact={true}
                            activeClassName="active-link"
                            >Sign up
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink 
                            to="/users/signin" 
                            className="nav-link"
                            exact={true}
                            activeClassName="active-link"
                            >Sign in
                            </NavLink>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search Quizz" arial-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>

        return (
            header
        );
    }
}

export default HeaderHome;