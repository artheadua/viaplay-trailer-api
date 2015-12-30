var bluebird = require('bluebird');
var request = require('request');
var requestAsync = bluebird.promisify(request);
var parseXMLBody = bluebird.promisify(require('xml2js').parseString);
var trailerApiUrl = 'http://api.traileraddict.com/?imdb=';
var trailerVideoUrl = 'https://v.traileraddict.com/';

var parseResponse = function(response){
  return parseXMLBody(response[1]);
}

var fetchTrailerUrl = function(imdbId){
  return requestAsync(trailerApiUrl + imdbId).then(parseResponse).then(constructVideoUrl);
}

var constructVideoUrl = function(xmlObj){
  return {'trailerUrl': trailerVideoUrl + xmlObj.trailers.trailer[0].trailer_id[0]};
}

module.exports = {
  fetchTrailerUrl: fetchTrailerUrl
}
