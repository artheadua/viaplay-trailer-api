var Hapi = require('hapi');
var Good = require('good');
var ControllerRepo = require('./controllers/controllers-repository');
var Options = require('./config');

var server = new Hapi.Server();

server.connection(Options);

ControllerRepo.registerControllers(server);

// Setting up logging and starting the server
server.register({
	register: Good,
	options: {
		reporters: [{
			reporter: require('good-console'),
			events: {
				response: '*',
				log: '*'
			}
		}]
	}
}, function (err) {
	if (err) {
        throw err;
    }

    server.start(function () {
    	server.log('info', 'Server running at: ' + server.info.uri);
    });
});

module.exports = server;
