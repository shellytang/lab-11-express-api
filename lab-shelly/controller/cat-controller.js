'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');
const createError = require('http-errors');

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');

  if(!schema) return Promise.reject(createError(400, 'schema required'));
  if(!item) return Promise.reject(createError(400, 'item required'));

  let jsonItem = JSON.stringify(item);

  fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, jsonItem)
  .then(() => jsonItem)
  .catch(err => Promise.reject(createError(500, err.message)));

  return Promise.resolve();
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(createError(400, 'schema required'));
    if(!id) return reject(createError(400, 'id required'));

    resolve(fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then(data => {
      try {
        return JSON.parse(data.toString()); 
      } catch (err) {
        return reject(createError(500, err.message));
      }
    })
    .catch(err => Promise.reject(createError,(500, err.message))));
  });
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(createError(400, 'schema required'));
    if(!id) return reject(createError(400, 'id required'));

    fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`, function(err){
      if(err) return reject(createError(500,err.message));
      resolve();
    });
  });
};

exports.updateItem = function(schema, id, name, mood) {
  debug('#putItem');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(createError(400, 'schema required'));
    if(!id) return reject(createError(400, 'id required'));

    fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then(data => {
      let jsonItem = JSON.parse(data.toString());
      jsonItem.name = name;
      jsonItem.mood = mood;

      jsonItem = JSON.stringify(jsonItem);

      fs.writeFileProm(`${__dirname}/../data/${schema}/${id}.json`, jsonItem)
        .then(() => jsonItem)
        .catch(err => Promise.reject(createError(500, err.message)));
      resolve();
    })
    .catch(err => Promise.reject(createError(500, err.message)));
  });
};
