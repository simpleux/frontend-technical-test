import React, {Component}         from 'react';

class Loading extends Component {

    render() {
        const {message} = this.props;

        return (
            <div className="component-loading">
                <div className="component-loading-inner">
                    <div className="component-loading-message">{ message }</div>
                </div>
            </div>
        );
    }

}

Loading.defaultProps = {
    message: "Loading."
};

export default Loading;