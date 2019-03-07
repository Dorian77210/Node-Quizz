import React from 'react';

import Input from '../form/Input';
import InputSubmit from '../form/InputSubmit';
import ErrorModal from '../modal/ErrorModal';

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
class BodySignin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }

        this.submitForm = this.submitForm.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
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