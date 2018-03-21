import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Token = new Mongo.Collection("tokens");

Meteor.methods({
	"insert_token"(token){
		return Token.insert({oauth_token: token.oauth_access_token, oauth_token_secret: token.oauth_access_token_secret})
	},
	"get_current_user"(){
		return this.userId
	}
})