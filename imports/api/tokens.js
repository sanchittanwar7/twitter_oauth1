import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Token = new Mongo.Collection("tokens");

Meteor.methods({
	"insert_token"(userId, request_token, request_token_secret){
		return Token.insert({userId, request_token, request_token_secret})
	},
	"get_current_user"(){
		return this.userId
	},
	"get_tokens"() {
		let token = Token.findOne({inUse: false})
		if(token === undefined)
			return undefined
		let userId = token.userId
		Token.update(
				{userId: userId},
				{
					$set : {
						
						"inUse": true
					}
				}
		)
		return token
	}
})