var bluebird = require('bluebird');
var request = require('request');
var requestAsync = bluebird.promisify(request);

var parseResponse = function(response){
  return JSON.parse(response[1])._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id.substr(2);
}

var fetchImdbId = function(contentUrl){
  return requestAsync(contentUrl).then(parseResponse);
}

module.exports = {
  fetchImdbId: fetchImdbId
}
