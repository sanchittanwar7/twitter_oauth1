
export default get_appConfig = (oauth_access_token, oauth_access_token_secret) => {

	let Twit = require('twit');

	let appConfig = new Twit({
		consumer_key:         'gRVg8FedIrQJEvhFncYyflRJ7',
		consumer_secret:      'ZAQKCqoUHpe8SzasjBY4Eav8l3pbXSkXUMEFxtlgYhDPbWIS5R',
		access_token:         oauth_access_token,
		access_token_secret:  oauth_access_token_secret
	})

	return appConfig

	// let res = await appConfig.get('followers/list', { screen_name: 'ICC' , count : 2 ,cursor : -1});
	// return res;
}