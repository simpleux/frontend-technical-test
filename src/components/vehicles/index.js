import React, {Component}         from 'react';
import api                        from '~/api';
import Loading                    from '~/components/loading';
import Error                      from '~/components/error';
import List                       from './list';

export default class Container extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            items  : [],
            error  : null
        }
    }

    load() {

        const loading = false;

        api.vehicles().then(items => {
            this.setState({loading, items})
        }).catch(error => {
            this.setState({loading, error})
        });

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.loading        !== nextState.loading ||
            this.state.error          !== nextState.error ||
            this.state.items.length   !== nextState.length
        );
    }

    componentDidMount() {
        this.load();
    }

    render() {

        const {loading, error, items} = this.state;

        if (loading) {
            return <Loading />
        }

        if (error) {
            return <Error message={ error }/>
        }

        return <List items={ items }/>;
    }

}