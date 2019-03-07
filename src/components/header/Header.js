import React from 'react';
import {BrowserRouter, Route, Miss} from 'react-router-dom';

import HeaderHome from './HeaderHome';

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
            <HeaderHome/>
        );
    }
}

export default Header;