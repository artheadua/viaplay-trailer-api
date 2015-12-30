module.exports = {
	routes: [{
		method: 'GET',
		path:'/',
		handler: function (request, reply) {
			reply({status: 'Welcome to Content API'});
		}
	}]
};
