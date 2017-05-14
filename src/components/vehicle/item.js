import React, {Component}         from 'react';
import Image                      from './image';

class Item extends Component {

    render() {
        const {
                id,
                media,
                description,
                price
              } = this.props;

        return (
            <div className={ `component-vehicle-item component-vehicle-item-${id}`}>

                <Image { ...media } />

                <div className="component-vehicle-inner">

                    <div className="component-vehicle-item-name">
                        <div className="component-vehicle-item-name-inner">
                            { id }
                        </div>
                    </div>

                    <div className="component-vehicle-item-price">
                        From <span>{ price }</span>
                    </div>

                    <div className="component-vehicle-item-description">
                        { description }
                    </div>

                </div>

            </div>
        )
    }

}

Item.defaultProps = {
    id         : "",
    description: "",
    price      : "",
    meta       : [],
    media      : {},
};

export default Item;