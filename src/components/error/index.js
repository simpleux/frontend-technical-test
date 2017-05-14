import React, {Component}         from 'react';

class Error extends Component {

    render() {
        const {message} = this.props;

        return (
            <div className="component-error">
                <div className="component-error-inner">
                    <div className="component-error-message">{ message }</div>
                </div>
            </div>
        )
    }

}

Error.defaultProps = {
    message: "An unexpected error occurred while processing your request."
};

export default Error;