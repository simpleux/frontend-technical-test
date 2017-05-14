import React, {Component}         from 'react';
import Vehicle                    from '~/components/vehicle';

class List extends Component {

    renderItems() {
        const { items, max } = this.props;

        //Ensure we are rendering only 4
        return items.slice(0,max).map((item, index) => <Vehicle key={ index} { ...item } />);
    }

    render() {

        return (
            <div className="component-vehicles">
                { this.renderItems() }
            </div>
        )
    }

}

List.defaultProps = {
    items: [],
    max: 4
};


export default List;