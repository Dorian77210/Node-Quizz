import React from 'react';
import Body from './body/Body';
import Header from './header/Header';

import { BrowserRouter } from 'react-router-dom'

class App extends React.Component {
    
    constructor(props) {
        super(props);
        const body = <Body/>
        const header = <Header/>
        this.state = {
            body: body,
            header: header
        };
    }

    // Different states of the component
    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        {this.state.header}
                        {this.state.body}
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;