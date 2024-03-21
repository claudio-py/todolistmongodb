const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const routes = require('./routes/routes');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(routes);
// ==============LIVERLOAD==============
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.watch(path.join(__dirname, 'views'));
liveReloadServer.server.once('connection', () => {
	setTimeout(() => {
		try {
			liveReloadServer.refresh('/');
			console.log('page is refreshed');
		} catch (error) {
			console.error(`Error refreshing page: ${error}`);
		}
	}, 1000);
});
app.use(connectLivereload());
// ==============LIVERLOAD==============
// ===============PROJECT=========

app.listen(port, () => {
	console.log(`http://localhost:${port}/`);
});
