const { Router } = require('express');

const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DeslikeController = require('./controllers/DeslikeController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/deslikes', DeslikeController.store);

module.exports = routes;
