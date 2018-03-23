import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { getOAuthRequestToken } from './oauth'
import { getOAuthAccessToken } from './oauth'
import {Token} from '../../api/tokens'





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
			Token.update(
				{request_token: oauth_request_token},
				{
					$set : {
						"access_token": res.oauth_access_token,
						"access_token_secret": res.oauth_access_token_secret
					}
				}
			)
			// Meteor.call("insert_token", res, (err, response) => {
			// 	if(err)
			// 		console.log(err)
			// 	else
			// 		console.log(response)
			// })
			

			// console.log(appConfig)

			// await appConfig.get('followers/list', { screen_name: 'ICC' , count : 2 ,cursor : -1}, (err,res) => {
			// 	if(err)
			// 		console.log(err)
			// 	else
			// 		console.log(res)
			// } );

		}catch(err) {
			console.log('error', error)
			throw new Meteor.Error("error")
		}
		return res;
	},
	"get_followers"(screen_name) {
		let next_cursor = -1;
	}

})