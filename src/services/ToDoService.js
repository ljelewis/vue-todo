import axios from 'axios';
import _ from 'lodash';

let url = 'http://api-url/todo';
export default {
	addItem(description) {
		return axios.post(url, this.upsertItemFormat(description));

	},
	completeItem(todo) {
		let id = _.get(todo, 'id');

		if(!id) {
			return Promise.reject();
		}

		return axios.put(url + '/completed/' + id);
	},
	deleteItem(todo) {
		let id = _.get(todo, 'id');

		if(!id) {
			return Promise.reject();
		}

		return axios.delete(url + '/' + id);
	},
	get() {
		return axios.get(url).then(response => this.getFormat(response.data));
	},
	getFormat(todos) {
		return _.map(todos, this.getFormatItem);
	},
	getFormatItem(todo) {
		return _.extend({ editing: false }, _.pick(todo, ['id', 'description', 'complete']));
	},
	updateItem(todo) {
		let id = _.get(todo, 'id');

		if(!id) {
			return Promise.reject();
		}

		return axios.post(url + '/' + id, this.upsertItemFormat(_.get(todo, 'name')));
	},
	upsertItemFormat(description) {
		return {
			todoName: description,
			todoDescription: description,
			createdBy: 'me'
		};
	}
}