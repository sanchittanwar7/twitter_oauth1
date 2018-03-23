import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Session } from 'meteor/session'
import TwitterLogin from '../../ui/TwitterLogin'
import {Token} from '../../api/tokens'


export default class App extends Component {
	render() {
		return(
			<TwitterLogin />
			)
	}
}

Meteor.startup( () => {
	ReactDOM.render(<App />, document.querySelector('.render-target'))
});