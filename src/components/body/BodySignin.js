import React from 'react';

import Input from '../form/Input';
import InputSubmit from '../form/InputSubmit';
import ErrorModal from '../modal/ErrorModal';

import { css } from '@emotion/core';
import { ClimbingBoxLoader } from 'react-spinners'; 
import { Redirect } from 'react-router-dom';

import axios from 'axios';

const override = css`
display: block;
position: fixed;
z-index: 1031;
margin: 0 auto;
top: 40vh;
`;
class BodySignin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }

        this.submitForm = this.submitForm.bind(this);
        this.changeValue = this.changeValue.bind(this);

        this.modalRef = React.createRef();
    }

    submitForm(event) {
        event.preventDefault();
        const modal = this.modalRef.current;
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        this.setState( { loading: true } );
        axios.post('/users/signin',user)
             .then(res => {
                this.setState( { loading: false} );
                this.props.history.push('/users/quizz');
            })
             .catch(error => {
                this.setState( { loading: false } );
                if(error.response) {
                    const data = error.response.data;
                    modal.setState({
                        title: data.title,
                        content: data.message,
                        show: true
                    });
                }
             });
    }

    changeValue(key, event) {
        const value = event.target.value;
        this.setState({
            [key]: value
        });
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
            <h3 className="text-center">Connect you to your account.</h3>
                <form onSubmit={(event) => this.submitForm(event)}>
                    <Input type="text"  
                           textContent="Email"
                           changeValue={this.changeValue}
                           name="email"/>

                    <Input type="password"
                           textContent="Password"
                           changeValue={this.changeValue}
                           name="password"/>

                    <InputSubmit
                            content="Connection"
                            submitForm={this.submitForm}/>

                    {/*Error modal */}
                    <ErrorModal 
                        content=""
                        title=""
                        ref={this.modalRef}
                    />
                </form>
            </div>

        );
    }
}

export default BodySignin;