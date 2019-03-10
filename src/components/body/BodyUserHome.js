import React from 'react';


import { css } from '@emotion/core';
import { ClimbingBoxLoader } from 'react-spinners'; 
import axios from 'axios';

const override = css`
display: block;
position: fixed;
z-index: 1031;
margin: 0 auto;
top: 40vh;
`;

class BodyUserHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentWillMount() {
         //retrieve the quizzs
         axios.get('/users/quizz/')
             .then(res => {
                 this.setState( {loading: false} );
                 const data = res.data;
                 console.log(data);
                 if(data.count == 0) {
                     this.setState({
                         quizz: 'No quizz available',
                     });
                 } else {
                     this.setState({
                         quizz: data.quizz
                     })
                 }
             })
             .catch(error => {

             });
    }

    componentDidMount() {
       
    }

    render() {
        return (
            <div className="container">
                <ClimbingBoxLoader
                css={override}
                sizeUnit={"px"}
                size={15}
                color={'#123abc'}
                loading={this.state.loading}
            />
            <h2 className="text-center">List of your quizz</h2>
            </div>
        );
    }
}

export default BodyUserHome;