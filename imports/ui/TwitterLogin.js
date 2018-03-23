import React, {Component} from 'react'
import Signup from './Signup'
import {Meteor} from 'meteor/meteor'
import {withTracker} from 'meteor/react-meteor-data'
import { Token } from '../api/tokens';
import TwitterData from './TwitterData'


class TwitterLogin extends Component {
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
				Meteor.call("insert_token", this.props.userId, res.token, res.secret)
				this.anchor.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${res.token}`
				res = this.anchor.click();
			}
		})
	}

	render() {

		if (!this.props.userId){
			return(
				<Signup />
				)
		}
		else{
			if(this.props.tokens && this.props.tokens[0] && this.props.tokens[0].access_token)
				return(
					<TwitterData />
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
}

export default withTracker( (props) => {
	let dataloaded;
	let tokens;
	let test1=Session.get("test1");
	let userId = Meteor.userId()
	const tokenSubHandle = Meteor.subscribe("tokens");
	dataloaded = tokenSubHandle.ready();
	if(tokenSubHandle.ready())
	{
		console.log("getting")
		tokens =Token.find().fetch();
		console.log(tokens)
	}

	return {
		dataloaded,
		tokens,
		test1,
		userId
	};
} )(TwitterLogin);