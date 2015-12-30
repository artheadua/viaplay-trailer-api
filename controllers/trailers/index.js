var Options = require('../../config');
var ViaplayProxy = require('../../proxy/viaplay');
var TrailerProxy = require('../../proxy/t-addict');
var Cache = require('../../cache');
var stringPattern = 'https://content.viaplay.se/web-se/film/';

var validateUrl = function(url){
	return url && url.indexOf(stringPattern) === 0;
}

module.exports = {
	routes: [{
		method: 'GET',
		path:'/trailers/{link}',
		handler: function (request, reply) {
			var url = decodeURIComponent(request.params.link);
			if (!validateUrl(url)){
					reply({'error':'bad url'}).code(400);
					return;
			}

			var inCache = Cache.checkCache(url);
			if (inCache){
					reply(inCache);
					return;
			}

			reply(ViaplayProxy.fetchImdbId(url).then(TrailerProxy.fetchTrailerUrl).then(function(trailer){return [url, trailer]}).spread(Cache.pipe));
		}
	}]
};
