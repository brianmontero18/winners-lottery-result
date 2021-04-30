const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api/drawings/euroJackpot',
		createProxyMiddleware({
			target: 'https://www.lottoland.com',
			changeOrigin: true,
		})
	);
};
