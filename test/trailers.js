var Code = require('code');
var lab = require('lab');
var server = require('../');
var Lab = exports.lab = lab.script();
var Cache = require('../cache');
var TrailerProxy = require('../proxy/t-addict');

Lab.experiment('Trailers', function() {
  // System tests
  Lab.test('tests endpoint and expects trailer url back', function(done) {
      var options = {
          method: 'GET',
          url: '/trailers/https%3A%2F%2Fcontent.viaplay.se%2Fweb-se%2Ffilm%2Fbig-hero-6-2014'
      };

      server.inject(options, function(response) {
          var result = response.result;

          Code.expect(response.statusCode).to.equal(200);
          Code.expect(result).to.be.instanceof(Object);
          Code.expect(result.trailerUrl).equal('https://v.traileraddict.com/99465');

          done();
      });
  });
  Lab.test('tests endpoint and expects HTTP 400 (bad request) response', function(done) {
      var options = {
          method: 'GET',
          url: '/trailers/https%3A%2F%2Fcontent.viaplay1.se%2Fweb-se%2Ffilm%2Fbig-hero-6-2014'
      };

      server.inject(options, function(response) {
          var result = response.result;

          Code.expect(response.statusCode).to.equal(400);

          done();
      });
  });
  Lab.test('tests trailer addict proxy and expects trailer url back', function(done) {
      TrailerProxy.fetchTrailerUrl(3659388).then(function(result){
        Code.expect(result).to.be.instanceof(Object);
        Code.expect(result.trailerUrl).to.equal('https://v.traileraddict.com/106131');

        done();
      });
  });

  // Infrastructure unit tests
  Lab.test('tests cache', function(done) {
    Cache.pipe('https://content.viaplay.se/web-se/film/lucy-2014', {trailerUrl: 'https://v.traileraddict.com/98688'});
    Cache.pipe('https://content.viaplay.se/web-se/film/lucy-2014', {trailerUrl: 'https://v.traileraddict.com/98689'});
    Code.expect(Cache.checkCache('https://content.viaplay.se/web-se/film/lucy-2014').trailerUrl).to.equal('https://v.traileraddict.com/98689');
    done();
  });
});
