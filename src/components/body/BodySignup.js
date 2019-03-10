import React from 'react';

import Input from '../form/Input';
import InputSubmit from '../form/InputSubmit';
import ProgressBar from '../helper/ProgressBar';
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

class BodySignup extends React.Component {

    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.updateStrongPercentage = this.updateStrongPercentage.bind(this);

        this.state = {
            loading: false,
            strongPercentage: 0, //default,
            strongContent: 'Low',  //default
            validations: {
                containsMaj: /[A-Z]/,
                containsSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
                minLength: 8
            }
        };

        this.progressBarRef = React.createRef();
        this.modalRef = React.createRef();
    }

    changeValue(key, event) {
        const value = event.target.value;
        this.setState({
            [key]: value
        });

        if(key == "password") {
            this.updateStrongPercentage(value);
        }
    }

    updateStrongPercentage(password) {
        const validations = this.state.validations;
        let force = 0;

        force = validations['containsMaj'].test(password) ? force + 1 : force;
        force = validations['containsSpecialChar'].test(password) ? force + 1 : force;
        force = password.length > validations['minLength'] ? force + 1 : force;

        let classStrength = "";
        switch( force ) {
            case 1: classStrength = "bg-danger"; this.setState({ strongContent: 'Low'}); break;
            case 2: classStrength = "bg-warning"; this.setState({ strongContent: 'Medium'}); break;
            case 3: classStrength = "bg-success";  this.setState({ strongContent: 'Strong'}); break;
        }

        const progressBar = this.progressBarRef.current;
        progressBar.setState({
            strongPercentage: force * 33.333,
            classStrength: classStrength
        });
    }

    submitForm(event) {
        event.preventDefault();
        // check validation of passwords
        const password = this.state.password;
        const confirmationPassword = this.state.confirmationPassword;
        if(password != confirmationPassword) {
            const modal = this.modalRef.current;
            modal.setState({
                show: true,
                content: "The passwords don't match",
                title: "Error during the confirmation of the account"
            });

            return false;
        }

        const user = {
            password: password,
            email: this.state.email,
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            pseudo: this.state.pseudo
        };

        // loading state
        this.setState( {loading: true} );
        axios.post('/users/signup', user)
             .then(res => {
                this.setState( {loading: false} );
                const modal = this.modalRef.current;
                modal.setState({
                    show: true,
                    content: res.data.content,
                    title: res.data.title 
                })
             })
             .catch(error => {
                 const modal = this.modalRef.current;
                 if(error.response) {
                    const data = error.response.data;
                    modal.setState({
                        show: true,
                        content: data.content,
                        title: data.title
                    });
                 }
                 this.setState( {loading: false} );
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
            <h3 className="text-center">Create your account now ! You will able to create quizz and to have other features !</h3>
                <form onSubmit={(event) => this.submitForm(event)}>
                    <Input type="email" 
                           textContent="Email" 
                           changeValue={this.changeValue}
                           name="email"/>

                    <Input type="text"  
                           textContent="Pseudo"
                           changeValue={this.changeValue}
                           name="pseudo"/>

                    <Input type="text"
                           textContent="First Name"
                           changeValue={this.changeValue}
                           name="firstName"/>

                    <Input type="text" 
                           textContent="Last name" 
                           changeValue={this.changeValue}
                           name="lastName"/>

                    <Input type="password"
                           textContent="Password"
                           changeValue={this.changeValue}
                           name="password"/>

                    <i className="text-center">Strength of your password : <strong>{this.state.strongContent}</strong></i>
                    <ProgressBar ref={this.progressBarRef} 
                                 strongPercentage={this.state.strongPercentage}
                                 classStrength=""
                                 />

                    <Input type="password"
                           textContent="Confirmation password"
                           changeValue={this.changeValue}
                           name="confirmationPassword"/>

                    <InputSubmit
                            content="Create account"
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

export default BodySignup;