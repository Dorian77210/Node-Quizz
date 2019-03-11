import React from 'react';

import { css } from '@emotion/core';
import { ClimbingBoxLoader } from 'react-spinners';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import ErrorModal from '../modal/ErrorModal';
import AsideUserHome from '../aside/AsideUserHome';

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
            loading: true,
            canRender: false
        };

        this.modalRef = React.createRef();
        this.asideRef = React.createRef();
    }

    componentWillMount() {

         //retrieve the quizzs
         axios.get('/users/quizz/')
             .then(res => {
                 this.setState( {loading: false} );
                 const data = res.data;
                 if(data.count == 0) {
                     this.setState({
                         quizzMessage: 'No quizz available',
                     });
                 } else {
                     this.setState({
                         quizzList: data.quizz
                     })
                 }
             })
             .catch(error => {
             });
    }

    componentDidMount() {
        this.setState({ loading: true } );
        axios.get('/users/by-token')
            .then(res => {
                const user = res.data.user;
                this.setState( {
                    user: user,
                    canRender: true
                } );

                this.setState({loading: false});

            })
            .catch(error => {
                const modal = this.modalRef.current;
                if(error.response) {
                    const data = error.response.data;
                    modal.setState({
                        show: true,
                        title: data.title,
                        content: data.content
                    });
                }
            });
    }

    render() {
        return (
            <div>
                {this.state.canRender && 
                    <CSSTransition 
                        in={true}
                        classNames="fade"
                        appear={true}
                        timeout={1500}>
                        <AsideUserHome user={this.state.user}/>
                    </CSSTransition>
                }
                <div className="container">
                    <ClimbingBoxLoader
                    css={override}
                    sizeUnit={"px"}
                    size={15}
                    color={'#123abc'}
                    loading={this.state.loading}
                />


                <h2 className="text-center">List of your quizz</h2>
                {this.state.quizzMessage &&
                    <p className="text-center">{this.state.quizzMessage}</p>
                }

                <ErrorModal 
                            content=""
                            title=""
                            ref={this.modalRef}
                        />
                </div>
            </div>
        );
    }
}

export default BodyUserHome;