import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './components/App';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import '@material-ui/core/CssBaseline';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    (
        <Provider store={store}>
            <SnackbarProvider maxSnack={4}>
                <App />
            </SnackbarProvider>
        </Provider>
    ),
    document.getElementById("root")
);


