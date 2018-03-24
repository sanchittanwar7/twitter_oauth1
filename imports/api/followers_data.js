import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const FollowersData = new Mongo.Collection("followers_data");

Meteor.methods({
	"handle.insert"(screen_name, followers) {
		return FollowersData.insert({screen_name, followers})
	},
	"handle.get"(screen_name) {
		return FollowersData.findOne({screen_name: screen_name})
	}
})