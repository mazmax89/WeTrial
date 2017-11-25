/*import * as knex from 'knex';
import * as bookshelf from 'bookshelf';*/
import * as knexConfig from '../knexfile.js';
const NODE_ENV = process.env.NODE_ENV;
/*const isProd = NODE_ENV === 'production';*/

/*if (isProd) {
  const bookshelf = bookshelf(knex(knexConfig.production));
} else {
  const bookshelf = bookshelf(knex(knexConfig.development));
}*/

const knex = require('knex')(knexConfig.development);
module.exports = require('bookshelf')(knex);

/*export default bookshelf(knex(knexConfig.development));*/
