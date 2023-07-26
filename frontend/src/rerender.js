import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Routes, BrowserRouter} from 'react-router-dom';
import { IntlProvider } from 'react-intl';

const rerender = () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    return (
        root.render(
            <React.StrictMode>
                <BrowserRouter>
                    <IntlProvider>
                        <App rerender={rerender} />
                    </IntlProvider>
                </BrowserRouter>
            </React.StrictMode>
        )
    )
}

export default rerender