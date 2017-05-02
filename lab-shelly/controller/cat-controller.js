'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const debug = require('debug')('http:cat-routes');

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');
  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!item) return Promise.reject(createError(400, 'item required'));

  let jsonItem = JSON.stringify(item);

  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, jsonItem)
  .then(() => jsonItem)
  .catch((err) => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');
  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
  .then(data => {
    try {
      return JSON.parse(data.toString());
    } catch (err) {
      console.log('whats the error: ', err);
      return createError(404, err.message);
    }
  })
  .catch(err => {
    return Promise.reject(createError(404, err.message));
  });
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return createError(400, 'id required');

  return fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`)
  .then(() => {})
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.updateItem = function(schema, id, name, mood) {
  debug('#updateItem');

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!id) return Promise.reject(createError(400, 'id required'));
  if(!name && !mood) return Promise.reject(createError(400, 'name and mood required'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
  .then(data => {
    let jsonItem = JSON.parse(data.toString());
    jsonItem.name = name;
    jsonItem.mood = mood;

    jsonItem = JSON.stringify(jsonItem);

    fs.writeFileProm(`${__dirname}/../data/${schema}/${id}.json`, jsonItem)
    .then(() => jsonItem)
    .catch(err => Promise.reject(createError(500, err.message)));
  })
  .catch(err => {
    return Promise.reject(createError(404, err.message));
  });
};
