import React from 'react';
import {BrowserRouter, Route, Miss} from 'react-router-dom';

import HeaderHome from './HeaderHome';
import HeaderUser from './HeaderUser';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="header">
                <Route path="/home" component={HeaderHome}/>
                <Route path="/users/signin" component={HeaderHome}/>
                <Route path="/users/signup" component={HeaderHome}/>

                <Route path="/users/quizz" component={HeaderUser}/>
            </div>
        );
    }
}

export default Header;