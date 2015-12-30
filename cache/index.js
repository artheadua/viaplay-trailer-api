var cache = {};

var pipe = function(movieUrl, trailerUrl){
  cache[movieUrl] = trailerUrl;
  return trailerUrl;
}

var checkCache = function (movieUrl){
  return cache[movieUrl];
}

module.exports = {
  pipe: pipe,
  checkCache: checkCache
}
