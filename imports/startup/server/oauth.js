import { OAuth } from 'oauth';

const consumerKey = 'gRVg8FedIrQJEvhFncYyflRJ7';
const consumerSecret = 'ZAQKCqoUHpe8SzasjBY4Eav8l3pbXSkXUMEFxtlgYhDPbWIS5R';

const oauthClient = new OAuth("https://twitter.com/oauth/request_token",
	"https://twitter.com/oauth/access_token",
	consumerKey, consumerSecret,
	"1.0A", "http://localhost:3000",
	"HMAC-SHA1"
	);

export const getOAuthRequestToken = () => {
	return new Promise((resolve, reject) => {
		oauthClient.getOAuthRequestToken(function(err, token, secret, result) {
			if(err){
				console.log(err)
				return reject(err)
			}
			resolve({
				token,
				secret,
				result
			})
		})
	})
}

export const getOAuthAccessToken = (oauth_request_token, oauth_request_token_secret, oauth_verifier) => {
	return new Promise((resolve, reject) => {
		oauthClient.getOAuthAccessToken(oauth_request_token, oauth_request_token_secret, oauth_verifier, function(error, oauth_access_token, oauth_access_token_secret) {
			if(error){
				console.log("error", error)
				return reject(error)
			}
			// console.log('oauth_access_token', oauth_access_token)
			// console.log('oauth_access_token_secret', oauth_access_token_secret)
			resolve({
				oauth_access_token,
				oauth_access_token_secret
			})
		})
	})
}