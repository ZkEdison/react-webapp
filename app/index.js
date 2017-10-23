import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import rootRedux from './reducers/index.js'

// import Home from './pages/Home/index'
import Hello from './containers/Hello.js'

let store = createStore(rootRedux, devToolsEnhancer())

ReactDOM.render(
	<Provider store={store}>
	    <Hello/>
	</Provider>,
	document.getElementById('root')
)
