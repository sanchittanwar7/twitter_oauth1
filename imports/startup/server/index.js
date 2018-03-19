import { Meteor } from 'meteor/meteor'
import url from 'url'
import { WebApp } from 'meteor/webapp'
import './twitter_methods'
import { Session } from 'meteor/session'




Meteor.startup(() => {
	WebApp.connectHandlers.use('/', (req, res, next) => {
		const oauth_verifier = url.parse(req.url, true).query.oauth_verifier;
		if(oauth_verifier){
			Meteor.call("get_oauth_token", oauth_verifier, (err, res) => {
				
			})
		}
		next();
	})
})