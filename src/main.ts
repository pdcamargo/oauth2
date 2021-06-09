import express from 'express';
import livereload from 'livereload';
import path from 'path';
import fs from 'fs';
import connectLivereload from 'connect-livereload';
import { setupReactViews } from 'express-tsx-views';

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'views'));

const app = express();

setupReactViews(app, {
	viewsDirectory: path.join(__dirname, 'views/pages'),
});

app.use(connectLivereload());

liveReloadServer.server.once('connection', () => {
	setTimeout(() => {
		liveReloadServer.refresh('/');
	}, 50);
});

const port = process.env.PORT || 3000;

const bootstrap = () => {
	const routes = (
		fs.readdirSync(path.join(__dirname, 'views/pages'), {
			withFileTypes: false,
		}) as string[]
	).map((route) => route.replace('.tsx', ''));

	routes.forEach((route) => {
		app.get(
			`/${route === 'index' ? '' : route}`,
			(_, res) => {
				res.render(`${route}`);
			},
		);
	});
};

bootstrap();

app.listen(port, () => {
	console.log('app listening on port ', port);
});
