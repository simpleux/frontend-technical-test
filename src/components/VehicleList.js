import React, { Component } from 'react';
import api 					from '~/api';
import Loading 				from '~/components/loading';

export default class VehicleList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null
		}
	}

	componentDidMount() {

		api.vehicles().then(data => {
			this.setState({data});
		});

	}

	render() {
		if(this.state.data) {
			console.log(this.state.data);
		    return (
			    <h1>Hello World</h1>
		    )
	    }

		return <Loading />;
	}
}