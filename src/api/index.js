import request from 'superagent';

const API_SERVER = process.env && process.env.API_SERVER ? process.env.API_SERVER : document.location.protocol + "//" + document.location.host

class API {

	constructor() {
		this.server = API_SERVER;
	}

	vehicles() {
		return this._query('api/vehicle', null, 'vehicles');
	}

	vehicle(id) {
		return this._query(`api/vehicle/${id}`);
	}

	setServer(server) {
		this.server = server;
		return this;
	}

	getServer() {
		return this.server;
	}

	_absoluteURL(url) {
		return `${this.server}/${url}`;
	}

	_query(api_url, params = null, responseKey = null) {
		return new Promise((resolve, reject) => {

			function processResponse(err, res) {

				//@FIXME The API Server is not responding with Correct Status Code and Exposes the Raw Error Messages
				if (err || !res.ok) {
					return reject(err.text);
				}


				if(res.body && typeof res.body === 'object') {
					if(responseKey) {
						return resolve(res.body[responseKey]);
					}
				}

				resolve(res.body);
			}

			if (params) {
				return request.post(this._absoluteURL(api_url))
					.send(params)
					.retry(3)
					.end(processResponse);
			}

			return request.get(this._absoluteURL(api_url))
				.retry(3)
				.end(processResponse);
		});
	}
}

const api = new API;

export default api;