import MySQLEvents from 'mysql-events';

const dsn = {
  host:     '127.0.0.1',
  user:     'root',
  password: 'qq2w3e4r',
};
const mysqlEventWatcher = MySQLEvents(dsn);
const watcher = mysqlEventWatcher.add(
  'projectm.topics',
  function (oldRow, newRow, event) {
    //row inserted
    if (oldRow === null) {
      console.log('topics deleted');
    }

    //row deleted
    if (newRow === null) {
      console.log('topics deleted');
    }

    //row updated
    if (oldRow !== null && newRow !== null) {
      console.log('topics updated w');
    }

  },
);
