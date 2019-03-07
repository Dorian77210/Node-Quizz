import React from 'react';
import BodyHome from './BodyHome';
import BodySignup from './BodySignup';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

class Body extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
    }

    componentWillUnmout() {
        console.log("toto");
    }

    componentWillReceiveProps(nextProps){
        console.log("toto");
     }


    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/home" component={BodyHome}/>
                    <Route exact path="/users/signup" component={BodySignup}/>
                </Switch>
            </div>            
        );
    }
}

export default Body;