const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config');
const isDev = process.env.NODE_ENV !== 'production';
import SignUp from './routes/signUp';
import SignIn from './routes/signIn';
import Topic from './routes/topics';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', SignUp);
app.use('/api/signin', SignIn);
app.use('/api/topic', Topic);

if (isDev) {
  const compiler = webpack(webpackConfig);
  app.use(historyApiFallback({
    verbose: false
  }));
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../build')));

} else {

  app.use(express.static(path.resolve(__dirname, '../build')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
    res.end();
  });
}

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('>>> 🌎 Open localhost:3000 in your browser.');
});

module.exports = app;
