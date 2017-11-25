import bookshelf from '../bookshelf';

export const User = bookshelf.Model.extend({
  tableName: 'users',
});
