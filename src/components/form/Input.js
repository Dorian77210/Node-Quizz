import React from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.textContent}</label>
                <input 
                    type={this.props.type}
                    className="form-control"
                    placeholder={this.props.textContent}
                    onKeyUp={(e) => this.props.changeValue(this.props.name, e)}
                    required
                />
            </div>
        );
    }
}

export default Input;