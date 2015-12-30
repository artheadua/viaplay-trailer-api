var controllers = [];

controllers.push(require('./trailers/'));
controllers.push(require('./default/'));

module.exports = {
	registerControllers: function(server){
		for (var i = controllers.length - 1; i >= 0; i--) {
			for (var j = controllers[i].routes.length - 1; j >= 0; j--) {
				server.route(controllers[i].routes[j]);
			};
		};
	},
	addController: function(controller){
		controllers.push(controller);
	}
};
