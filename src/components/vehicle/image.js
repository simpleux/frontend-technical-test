import React, {Component}         from 'react';

class Image extends Component {

    render() {

        const { name, url } = this.props;

        if(!url) {
            return null;
        }

        return (
            <div className={ `component-vehicle-image`}>
                <img src={ url } alt={ name } role="presentation" />
            </div>
        )
    }

}

Image.defaultProps = {
    name: "",
    url : ""
};

export default Image;