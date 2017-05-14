import React, {Component}         from 'react';
import api                        from '~/api';
import Loading                    from '~/components/loading';
import Error                      from '~/components/error';
import Item                       from './item';


class Container extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            item   : null,
            error  : null
        }
    }


    componentDidMount() {
        this.load();
    }

    load() {

        const loading = false;

        api.vehicle(this.props.id).then(item => {
            this.setState({loading, item});
        }).catch(error => {
            this.setState({loading, error})
        });
    }

    renderItem() {

        const {loading, error, item}  = this.state;
        const {media}                 = this.props;

        if (loading) {
            return <Loading />
        }

        if (error) {
            return <Error message={ error }/>
        }

        return <Item media={ Array.isArray(media) ? media[0] : {} }  { ...item }/>;
    }

    render() {
        const {className} = this.props;

        return (
            <div className={ `component-vehicle component-vehicle-${className}`}>
                { this.renderItem() }
            </div>
        )
    }

}

Container.defaultProps = {
    id       : 0,
    modelYear: "",
    url      : "",
    media    : [],
    className: "",
    item     : null,
    error    : null,
    loading  : true
};

export default Container;