import React from 'react';
import BodyHome from './BodyHome';
import BodySignup from './BodySignup';
import BodySignin from './BodySignin';
import BodyUserHome from './BodyUserHome';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

class Body extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
    }

    componentWillUnmout() {
    }

    componentWillReceiveProps(nextProps){
     }


    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/home" component={BodyHome}/>
                    <Route exact path="/users/signup" component={BodySignup}/>
                    <Route exact path="/users/signin" component={BodySignin}/>
                    <Route exact path="/users/quizz" component={BodyUserHome}/>
                </Switch>
            </div>            
        );
    }
}

export default Body;