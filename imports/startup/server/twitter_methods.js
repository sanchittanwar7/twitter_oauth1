import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { getOAuthRequestToken } from './oauth'
import { getOAuthAccessToken } from './oauth'
import {Token} from '../../api/tokens'
import get_appConfig from './twitterConfig'




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
						"access_token_secret": res.oauth_access_token_secret,
						"inUse": false,
						"cantUseUntil": 0
					}
				}
				)

		}catch(err) {
			console.log('error', error)
			throw new Meteor.Error("error")
		}
		return res;
	},
	async "get_followers"(screen_name) {
		let followers = []
		let length = 0, new_appConfig;
		let next_cursor = -1;
		let tokens = Meteor.call("get_tokens")
		if(tokens) {
			let appConfig = get_appConfig(tokens.access_token, tokens.access_token_secret)
			while(next_cursor != 0){
				try{
					let result = await appConfig.get('followers/list', { screen_name: screen_name , count : 10 ,cursor : next_cursor})
					length += 200
					console.log("ressssssssssssssssssssssssssssss", result.resp.caseless.dict['x-rate-limit-reset'])
					console.log("got the dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
					result.data.users.forEach((follower) => {
						followers.push(follower)
					})
					next_cursor = result.data.next_cursor
					if(result.resp.caseless.dict['x-rate-limit-remaining'] <= 6){



						Token.update(
							{userId: tokens.userId},
							{
								$set : {
									"inUse": false,
									"cantUseUntil": result.resp.caseless.dict['x-rate-limit-reset']
								}
							}
						)



						let new_tokens = Meteor.call("get_tokens")
						console.log("new token", new_tokens)
						if(new_tokens === undefined){
							next_cursor = 0
							
						}
						else{
							new_appConfig = get_appConfig(new_tokens.access_token, new_tokens.access_token_secret)
							console.log("new appConfig", new_appConfig)
						}
						tokens = new_tokens
					}
					appConfig = new_appConfig !== undefined ? new_appConfig : appConfig
					new_appConfig = undefined
					console.log("updated appConfig", appConfig)
				}catch(err){
					console.log(err)
				}
			}
		}
		else{
			console.log("No free token")
		}
		return followers;
	}

})