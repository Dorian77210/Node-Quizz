import React from 'react';

class ProgressBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            strongPercentage: this.props.strongPercentage,
            classStrength: this.props.classStrength
        };

    }

    render() {
        return (
            <div className="progress">
                <div className={"progress-bar " + this.state.classStrength} 
                role="progressbar" 
                aria-valuenow={this.state.strongPercentage} 
                aria-valuemin="0" 
                aria-valuemax="100"
                style={{width: `${this.state.strongPercentage}%`}}></div>
            </div>
        );
    }
}

export default ProgressBar;