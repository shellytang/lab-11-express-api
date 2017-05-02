'use strict';

const catController = require('../controller/cat-controller');
const Cat = require('../model/cat');

module.exports = function(router) {

  router.get('/api/cat/:id', function(req, res) {
    if(req.params.id) {
      catController.fetchItem('cat', req.params.id)
      .then(data => res.json(JSON.stringify(data)))
      .catch(err => res.send(err));
      return;
    }
  });

  router.post('/api/cat', function(req, res) {
    let cat = new Cat(req.body.name, req.body.mood);
    catController.createItem('cat', cat)
    .then(() => res.json(JSON.stringify(cat)))
    .catch(err => res.send(err));
  });

  router.delete('/api/cat/:id', function(req, res) {
    if(req.params.id) {
      catController.deleteItem('cat', req.params.id)
      .then(() => res.send('delete successful'))
      .catch(err => res.send(err));
    }
  });

  router.put('/api/cat/:id', function(req, res) {
    if(req.params.id) {
      console.log('req params: ', req.params);
      catController.updateItem('cat', req.params.id, req.body.name, req.body.mood)
      .then(() => res.send('update sucessful'))
      .catch(err => res.send(err));
    }
  });
};
