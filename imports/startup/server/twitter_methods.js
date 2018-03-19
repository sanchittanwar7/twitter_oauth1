import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { getOAuthRequestToken } from './oauth'
import { getOAuthAccessToken } from './oauth'

let oauth_request_token, oauth_request_token_secret

Meteor.methods({
	async "get_request_token"(){
		let res;
		try{
			res = await getOAuthRequestToken();
			oauth_request_token = res.token
			oauth_request_token_secret = res.secret
			console.log("got the token")
		}catch(err) {
			console.log("error while getting token")
			throw new Meteor.Error("oauth request token exception")
		}
		return res;
	},
	async "get_oauth_token"(oauth_verifier) {
		console.log(oauth_request_token, oauth_request_token_secret, oauth_verifier)
		try{
			let res = await getOAuthAccessToken(oauth_request_token, oauth_request_token_secret, oauth_verifier);
			console.log("Final tokens", res)
		}catch(err) {
			console.log('error', error)
			throw new Meteor.Error("error")
		}
		return res;
	},

})