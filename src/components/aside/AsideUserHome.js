import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

class AsideUserHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    render() {
        return (
            <div className="card float-left" style={{
                width: `16rem`
            }}>
                <div className="card-body bg-light">
                    <h5 className="card-title text-center border-top-0 border-right-0 border-left-0 border border-secondary">
                        Your profil
                    </h5>
                    <ul className="card-text">
                        <li>Pseudo : {this.state.user.pseudo}</li>
                        <li>First name : {this.state.user.firstName}</li>
                        <li>Last name : {this.state.user.lastName}</li>
                        <li>Email : {this.state.user.email}</li>
                        <li>Profil created at : {this.state.user.createdAt}</li>
                    </ul>
                    <div className="text-center">
                        <Link to="/users/account-update/"><Button>Update</Button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default AsideUserHome;