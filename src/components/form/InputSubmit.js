import React from 'react';

class InputSubmit extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="btn btn-primary">{this.props.content}</button>
        );
    }

}

export default InputSubmit;