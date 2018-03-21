import React, {Component} from 'react'
import Signup from './Signup'
import Meteor from 'meteor/meteor'

export default class TwitterLogin extends Component {
	constructor(props){
		super(props);
		this.twitterLogin = this.twitterLogin.bind(this);
	}

	twitterLogin() {
		Meteor.call("get_request_token", (err, res) => {
			if(err)
				console.log(err)
			else{
				console.log(res)
		Session.set('responds', res.secret)
								// console.log(Session)

								this.anchor.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${res.token}`
								res = this.anchor.click();
							}
						})
}

render() {
	
	if (!this.userId)
		return(
			<Signup />
			)
	else{
		return(
			<div>
			<button onClick = {this.twitterLogin.bind(this)}>Login with Twitter</button>
			<a style = {{ display: "none" }} href="#"
			ref = {el => {this.anchor = el; }}>
			</a>
			</div>
			)
	}
}
}