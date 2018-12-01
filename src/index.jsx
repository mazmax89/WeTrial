import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './store/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import App from './container/App';
import {sessionCheck} from './actions/userActions';

const DefaultStore = store();
DefaultStore.dispatch(sessionCheck());

ReactDom.render(
	<Provider store={DefaultStore}>
		<AppContainer warnings={false}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</AppContainer>
	</Provider>,
	document.getElementById('app')
);

if (module.hot) {
	module.hot.accept('./container/App.jsx', () => {
		const NextApp = require('./container/App.jsx').default;
		ReactDom.render(
			<Provider store={DefaultStore}>
				<AppContainer>
					<BrowserRouter>
						<NextApp/>
					</BrowserRouter>
				</AppContainer>
			</Provider>,
			document.getElementById('app')
		);
	});
}

