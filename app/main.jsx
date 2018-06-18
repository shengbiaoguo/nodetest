import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root.jsx'
import configureStore from './store/configureStore.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from './styles/app.scss';
import favicon from './images/favicon.png';
import moment from 'moment-timezone';

moment.tz.setDefault("Asia/Shanghai");

let store = configureStore();
injectTapEventPlugin();
const rootElement = document.getElementById('content')

ReactDOM.render(
	<Root store={store} />, rootElement
)
