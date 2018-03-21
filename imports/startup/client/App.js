import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Session } from 'meteor/session'
import TwitterLogin from '../../ui/TwitterLogin'
import Token from '../../api/tokens'


export default class App extends Component {
	

	constructor(props) {
		super(props)
		this.state = {
			userId: null
		}
	}

	componentWillMount(){
		Meteor.call("get_current_user", (err, res) => {
			if(err)
				console.log(err)
			else{
				current_user = res
				this.setState({userId: current_user})
		console.log(res)
}
})
}

render() {
	
		// console.log(current_user)
		return(
			<TwitterLogin 
			userId = {this.state.userId}
			/>
			)
		
	}
}

Meteor.startup( () => {
	ReactDOM.render(<App />, document.querySelector('.render-target'))
});